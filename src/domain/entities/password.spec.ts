import Password from "./password"

describe("password", () => {
    it("should be able create password", async () => {
        const promise = Password.create("passwordTest")
        await expect(promise).resolves.not.toThrow()
    })

    it("should be able validate password", async () => {
        const password = await Password.create("passwordTest")
        const isValidPassoword = await password.validate("passwordTest")

        expect(isValidPassoword).toBeTruthy()
    })

    it("should not be able validate invalid password", async () => {
        const password = await Password.create("passwordTest")
        const isValidPassoword = await password.validate("passwordTet")

        expect(isValidPassoword).toBeFalsy()
    })
})
