import DomainEvent from "../building-blocks/event";
import UUID from "../building-blocks/object-values/id";

import User from "../entities/user"

export default class TransferedEvent implements DomainEvent {
    readonly eventName: string = 'TransferedEvent'
    readonly eventVersion: number = 1;
    readonly ocurrendOn: Date = new Date();

    constructor(
        readonly from: User,
        readonly to: User,
        readonly value: number,
        readonly id: UUID
    ) {}
}