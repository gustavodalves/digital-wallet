import EmailAlreadyInUseError from "../exceptions/user/email-already-in-use"
import TaxIdAlreadyInUseError from "../exceptions/user/tax-id-already-in-use"
import UserRepository from "../repositories/user"

export default class ValidateUser {
    constructor(
        private readonly userRepository: UserRepository,
    ) {}

    public async isValidUser(email: string, taxId: string) {
        const isUserEmailAlreadyInUse = (await this.userRepository.getByEmail(email))
        if(isUserEmailAlreadyInUse) throw new EmailAlreadyInUseError()

        const isUseTaxIdAlreadyInUse = (await this.userRepository.getByTaxId(taxId))
        if(isUseTaxIdAlreadyInUse) throw new TaxIdAlreadyInUseError()

        return !isUserEmailAlreadyInUse && !isUseTaxIdAlreadyInUse
    }
}
