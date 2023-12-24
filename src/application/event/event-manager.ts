import DomainEvent from "../../domain/building-blocks/event"
import { Handler } from "./handler"

export default interface DomainEventManager {
    register(handler: Handler): void
    publish(event: DomainEvent): Promise<void>
};
