import Command from "../../helpers/patterns/command"
import Transfer from "../entities/transfer"
import User, { CommomUser, ReceiveTransfer, SendTransfer } from "../entities/user"

export default class TransferService implements Command {
    constructor(
        readonly from: User & SendTransfer,
        readonly to: User & ReceiveTransfer,
        readonly value: number
    ) {}

    do() {
        this.from.sendMoney(this.value)
        this.to.receiveTransfe(this.value)

        return Transfer.create({
            from: this.from,
            to: this.to,
            value: this.value,
        })
    }

    undo() {
        this.to.wallet.receiveMoney(this.value)
        this.from.wallet.sendMoney(this.value)
    }
}
