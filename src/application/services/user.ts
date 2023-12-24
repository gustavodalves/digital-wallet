import { CommomUser, CreateCommand, ShopkeeperUser, SendTransfer } from "../../domain/entities/user";
import UserRepository from "../../domain/repositories/user";
import TransactionValidator from "../gateways/transaction-validator";

import TransferService from "../../domain/service/transfer";
import ValidateUser from "../../domain/service/validate-user";
import { TransferRepository } from "../../domain/repositories/transfer";
import TransferedEvent from "../../domain/events/transer";
import DomainEventManager from "../event/event-manager";
import UnitOfWork from "../uow";

export default class UserService {
    private readonly validateUserService: ValidateUser

    constructor(
        private readonly userRepository: UserRepository,
        private readonly transactionValidator: TransactionValidator,
        private readonly eventManager: DomainEventManager,
        private readonly transferRepository: TransferRepository,
        private readonly uow: UnitOfWork,
    ) {
        this.validateUserService = new ValidateUser(this.userRepository)
    }

    async createCommomUser(input: CreateCommand) {
        const userIsValid = await this.validateUserService.isValidUser(input.email, input.taxId)
        if(!userIsValid) { throw new Error('input data is invalid') }
        const user = await CommomUser.create(input)
        await this.userRepository.save(user)
    }

    async createShopkeeperUser(input: CreateCommand) {
        const userIsValid = await this.validateUserService.isValidUser(input.email, input.taxId)
        if(!userIsValid) { throw new Error('input data is invalid') }
        const user = await ShopkeeperUser.create(input)
        await this.userRepository.save(user)
    }

    async createUser(
        input: CreateCommand,
        role: string
    ) {
        if(role === "Commom") await this.createCommomUser(input)
        else if(role === "Shopkeeper") await this.createShopkeeperUser(input)
        else throw new Error("role dont exists")
    }

    async getByTaxId(taxId: string) {
        const item = await this.userRepository.getByTaxId(taxId)
        if(!item) throw new Error('user not founded')

        return item.toJson()
    }

    async transfer(
        fromUserTaxId: string,
        toUserTaxId: string,
        value: number
    ) {
        const from = await this.userRepository.getByTaxId(fromUserTaxId)

        if(!(from instanceof CommomUser)) {
            throw new Error("user not possible do this action")
        }

        const to = await this.userRepository.getByTaxId(toUserTaxId)

        if(!from || !to) throw new Error("account not founded")

        const transferService = new TransferService(from, to, value)
        const transfer = transferService.do()

        const isValidTransaction = await this.transactionValidator.validate(transfer.uuid)

        if(!isValidTransaction) {
            transferService.undo()
            throw new Error('transfer failed on validate transaction')
        }

        await this.uow.runInTransaction(async () => {
            await this.userRepository.update(to)
            await this.userRepository.update(from)
            await this.transferRepository.save(transfer)
        })

        const transfered = new TransferedEvent(
            from, to, value, transfer.uuid
        )

        await this.eventManager.publish(transfered)
    }

    async creditInAccount(userTaxId: string, value: number) {
        const from = await this.userRepository.getByTaxId(userTaxId)

        if(!from) throw new Error("account not founded")

        from.receiveTransfe(value)
        await this.userRepository.update(from)
    }
}
