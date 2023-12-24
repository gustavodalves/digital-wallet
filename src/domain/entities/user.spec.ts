import { CommomUser, ShopkeeperUser } from "./user"

describe("user", () => {
    test("should be able create commom user", async () => {
        const user = await CommomUser.create({
            email: "g@gmail.com",
            name: "GUTI",
            password: "test",
            taxId: "99460782019"
        })

        expect(user).toBeInstanceOf(CommomUser)
    })

    test("should be able create commom user", async () => {
        const user = await ShopkeeperUser.create({
            email: "g@gmail.com",
            name: "GUTI",
            password: "test",
            taxId: "99460782019"
        })

        expect(user).toBeInstanceOf(ShopkeeperUser)
    })
})
