import UserService from "../../src/application/services/user"
import FakeDomainEventManager from "../infra/fake-event-manager"
import FakeNotificationGateway from "../infra/fake-notification"
import FakeTransactionValidatorGateway from "../infra/fake-transaction-validator-gateway"
import { FakeTransferRepository } from "../infra/fake-transfer-repository"
import FakeUserRepository from "../infra/fake-user-repository"

import TransferHandler from '../../src/application/event/transfer-handler'
import FakeUow from "../infra/fake-uow"

const eventManager = new FakeDomainEventManager()

const transferHandler = new TransferHandler(new FakeNotificationGateway())

eventManager.register(transferHandler)

describe('Transfer', () => {
    it('should be able do transfer', async () => {
        const userService = new UserService(
            new FakeUserRepository(),
            new FakeTransactionValidatorGateway(),
            eventManager,
            new FakeTransferRepository(),
            new FakeUow(),
        )

        await userService.createCommomUser({
            email: "g@gmail.com",
            name: "GUTI",
            password: "test",
            taxId: "99460782019"
        })

        await userService.createCommomUser({
            email: "gu@gmail.com",
            name: "GUTI",
            password: "test",
            taxId: "96821080000115"
        })

        const from = await userService.getByTaxId("99460782019")

        await userService.creditInAccount(from.taxId, 100)

        await userService.transfer(
            "99460782019",
            "96821080000115",
            20
        )

        const fromOutput = await userService.getByTaxId("99460782019")
        const toOutput = await userService.getByTaxId("96821080000115")

        expect(fromOutput.balance).toBe(80)
        expect(toOutput.balance).toBe(20)
    })

    it('should be able do transfer with shopkeeper send money', async () => {
        const userService = new UserService(
            new FakeUserRepository(),
            new FakeTransactionValidatorGateway(),
            eventManager,
            new FakeTransferRepository,
            new FakeUow()
        )

        await userService.createShopkeeperUser({
            email: "g@gmail.com",
            name: "GUTI",
            password: "test",
            taxId: "99460782019"
        })

        await userService.createCommomUser({
            email: "gu@gmail.com",
            name: "GUTI",
            password: "test",
            taxId: "96821080000115"
        })

        const from = await userService.getByTaxId("99460782019")

        await userService.creditInAccount(from.taxId, 100)

        const request = userService.transfer(
            "99460782019",
            "96821080000115",
            20
        )

        await expect(request).rejects.toThrowError()
    })
})
