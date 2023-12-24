import { PrismaClient } from "@prisma/client"
import UserService from "../application/services/user"
import { DomainEventManagerQueue } from "../infra/events/event-manager-queue"
import TransactionValidatorMocky from "../infra/gateways/transaction-validator"
import AxiosAdapter from "../infra/http-client/axios-adapter"
import RabbitMQQueueAdapter from "../infra/queue/rabbitmq"
import CreateUserControllerFactory from "./factories/controller/create-user"
import TransferControllerFactory from "./factories/controller/transfer"
import TransferRepositoryPrismaFactory from "./factories/repositories/transfer"
import UserRepositoryPrismaFactory from "./factories/repositories/user"
import ExpressAdapter from "./http/express/app/express"
import CreateUserRoute from "./http/routes/create-user"
import TransferRoute from "./http/routes/transfer"
import TransferHandler from "../application/event/transfer-handler"
import NotificationMocky from "../infra/gateways/notification-gateway"
import FakeUserRepository from "../../test/infra/fake-user-repository"
import { FakeTransferRepository } from "../../test/infra/fake-transfer-repository"
import Env from "./config/env"
import FakeDomainEventManager from "../../test/infra/fake-event-manager"
import PrismaUow from "../infra/database/prisma/uow"

export default async function bootstrap() {
    const app = new ExpressAdapter()

    const prisma = new PrismaClient({ log: ["query"] })

    const userRepository = new UserRepositoryPrismaFactory(prisma).generate()
    const transferRepository = new TransferRepositoryPrismaFactory(prisma).generate()

    const queue = new RabbitMQQueueAdapter(
        Env.get('QUEUE_URL')
    )
    await queue.connect();

    const eventManagerQueue = new DomainEventManagerQueue(
        queue
    )

    const httpClient = new AxiosAdapter()

    eventManagerQueue.register(
        new TransferHandler(
            new NotificationMocky(httpClient)
        )
    )

    const uow = new PrismaUow(prisma)

    const userService  = new UserService(
        userRepository,
        new TransactionValidatorMocky(httpClient),
        eventManagerQueue,
        transferRepository,
        uow,
    )

    const createUserController = new CreateUserControllerFactory(userService).generate()
    const createUserRoute = new CreateUserRoute(createUserController)

    const transferController = new TransferControllerFactory(userService).generate()
    const transferRoute = new TransferRoute(transferController)

    app.on(createUserRoute)
    app.on(transferRoute)

    app.listen(3000)
}
