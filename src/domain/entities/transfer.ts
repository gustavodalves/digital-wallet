import Entity from "../building-blocks/entity";
import UUID from "../building-blocks/object-values/id";
import User, { SendTransfer } from "./user";

type CreateTransferCommand = {
    from: SendTransfer & User,
    to: User,
    value: number,
}

export default class Transfer extends Entity {
    constructor(
        readonly from: SendTransfer & User,
        readonly to: User,
        readonly value: number,
        id: UUID,
    ) { super(id) }

    static create(input: CreateTransferCommand) {
        return new Transfer(
            input.from,
            input.to,
            input.value,
            new UUID()
        )
    }
}
