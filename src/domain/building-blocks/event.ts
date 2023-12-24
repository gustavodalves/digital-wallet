import UUID from "./object-values/id"

export default interface DomainEvent {
    eventName: string
    ocurrendOn: Date
    id: UUID
    eventVersion: number
}
