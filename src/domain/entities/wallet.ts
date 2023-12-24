import Transfer, { ReceiveTransfer, SendTransfer } from "./transaction";

export default class Wallet {
    constructor(
        private readonly tranfers: Transfer[] = []
    ) {}

    getTransfers() {
        return this.tranfers
    }

    getTotal() {
        return this.tranfers.reduce((acc, item) => {
            return item.calc(acc)
        }, 0)
    }

    sendMoney(value: number) {
        if(this.getTotal() < value) throw new Error("dont have balance to send money")
        this.tranfers.push(
            new SendTransfer(value)
        )
    }

    receiveMoney(value: number) {
        this.tranfers.push(
            new ReceiveTransfer(value)
        )
    }
}
