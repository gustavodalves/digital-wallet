import { CommomUser, ShopkeeperUser } from "../entities/user"
import TransferCommand from "./transfer"

describe("Transfer Domain Service", () => {
    it("should be able transfer money", async () => {
        const account = await CommomUser.create({
            email: "g@gmail.com",
            name: "GUTI",
            password: "test",
            taxId: "99460782019"
        })

        const receiver = await ShopkeeperUser.create({
            email: "g@gmail.com",
            name: "GUTI",
            password: "test",
            taxId: "99460782019"
        })

        account.receiveTransfe(100)

        const transferService = new TransferCommand(
            account,
            receiver,
            20
        )

        transferService.do()

        expect(account.wallet.getTotal()).toBe(80)
        expect(receiver.wallet.getTotal()).toBe(20)
    })
})
