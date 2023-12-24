import DomainEventManager from "../../src/application/event/event-manager";
import { Handler } from "../../src/application/event/handler";
import DomainEvent from "../../src/domain/building-blocks/event";

export default class FakeDomainEventManager implements DomainEventManager {
    handlers: Handler[] = []

    register(handler: Handler) {
        this.handlers.push(handler)
    }

    async publish(event: DomainEvent) {
        const handler = this.handlers.find(item => item.handlerEventName === event.eventName)
        await handler?.handle(event)
    }
}