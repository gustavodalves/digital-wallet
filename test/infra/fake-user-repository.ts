import User from "../../src/domain/entities/user";
import UserRepository from "../../src/domain/repositories/user";

export default class FakeUserRepository implements UserRepository {
    private readonly users: User[] = []

    async getByEmail(email: string): Promise<User|undefined> {
        return this.users.find(item => item.email.getValue() === email)
    }

    async getByTaxId(taxId: string): Promise<User | undefined> {
        return this.users.find(item => item.taxId.getValue() === taxId)
    }

    async save(user: User): Promise<void> {
        this.users.push(user)
    }

    async update(user: User): Promise<void> {
        const index = this.users.findIndex(item => item.email.getValue() === user.email.getValue())

        this.users.splice(index, 1)
        await this.save(user)
    }
}
