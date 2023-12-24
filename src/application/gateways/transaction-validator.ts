import UUID from "../../domain/building-blocks/object-values/id";

export default interface TransactionValidatorGateway {
    validate(transactionId: UUID): Promise<boolean>
}
