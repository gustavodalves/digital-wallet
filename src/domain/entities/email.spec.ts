import Email from "./email";

describe("email", () => {
    it("should be create valid email", () => {
        const email = new Email(
            "g@gmail.com"
        )

        expect(email.getValue()).toBe("g@gmail.com")
    })

    it("should be able create invalid email", () => {
        expect(() => new Email(
            "g@gmailom"
        )).toThrowError()
    })
})
