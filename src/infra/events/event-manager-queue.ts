import DomainEventManager from "../../application/event/event-manager";
import { Handler } from "../../application/event/handler";
import DomainEvent from "../../domain/building-blocks/event";
import Queue from "../queue/queue";

export class DomainEventManagerQueue implements DomainEventManager {
    constructor(
        private readonly queue: Queue
    ) {}

    register(handler: Handler) {
        this.queue.on(handler.handlerEventName, handler.handle);
    }

    async publish(event: DomainEvent) {
        await this.queue.publish(event);
    }
}
