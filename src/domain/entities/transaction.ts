import Entity from "../building-blocks/entity"
import UUID from "../building-blocks/object-values/id"

export default abstract class Transfer extends Entity {
    constructor(
        readonly type: 'Receive' | 'Send',
        readonly value: number,
        id: UUID
    ) {
        super(id)
    }

    abstract calc(total: number): number
}

export class ReceiveTransfer extends Transfer {
    constructor(value: number, id?: string) {
        super('Receive', value, new UUID(id))
    }

    calc(total: number): number {
        return total + this.value
    }
}

export class SendTransfer extends Transfer {
    constructor(value: number, id?: string) {
        super('Send', value, new UUID(id))
    }

    calc(total: number): number {
        return total - this.value
    }
}

