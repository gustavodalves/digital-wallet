import { ReceiveTransfer, SendTransfer } from "./transaction"

describe("transaction", () => {
    it("should be able calculate send money", () => {
        const total = 100

        const sendtransfer = new SendTransfer(10)
        const calculated = sendtransfer.calc(total)

        expect(calculated).toBe(90)
    })

    it("should be able calculate recieve money", () => {
        const total = 100

        const receive = new ReceiveTransfer(10)
        const calculated = receive.calc(total)

        expect(calculated).toBe(110)
    })
})
