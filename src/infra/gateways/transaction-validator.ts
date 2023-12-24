import TransactionValidatorGateway from "../../application/gateways/transaction-validator";
import UUID from "../../domain/building-blocks/object-values/id";
import HttpClient from "../http-client/http-client";

export default class TransactionValidatorMocky implements TransactionValidatorGateway {
    constructor(
        private readonly httpClient: HttpClient
    ) {}

    async validate(transactionId: UUID): Promise<boolean> {
        const response = await this.httpClient.get(`https://run.mocky.io/v3/${transactionId.getValue()}`)
        return response !== 'Not found'
    }
}
