import User from "../entities/user"

export default interface UserRepository {
    getByTaxId(taxId: string): Promise<User | undefined>
    getByEmail(email: string): Promise<User | undefined>
    save(user: User): Promise<void>
    update(user: User): Promise<void>
}
