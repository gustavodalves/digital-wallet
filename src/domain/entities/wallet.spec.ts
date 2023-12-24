import Wallet from "./wallet"

describe("wallet", () => {
    it("should be able calculate balance", () => {
        const wallet = new Wallet()

        wallet.receiveMoney(100)
        wallet.sendMoney(10)

        expect(wallet.getTotal()).toBe(100 - 10)
    })

    it("should not be able send money with less money than request value", () => {
        const wallet = new Wallet()
        expect(() => wallet.sendMoney(10)).toThrow()
    })
})
