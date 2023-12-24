import TransactionValidator from "../../src/application/gateways/transaction-validator";
import UUID from "../../src/domain/building-blocks/object-values/id";

export default class FakeTransactionValidatorGateway implements TransactionValidator {
    async validate(transactionId: UUID): Promise<boolean> {
        return true
    }
}
