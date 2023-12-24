import DomainEvent from "../../domain/building-blocks/event";
import TransferedEvent from "../../domain/events/transer";
import NotificationGateway from "../gateways/notification";
import { Handler } from "./handler";

export default class TransferHandler implements Handler {
    handlerEventName: string = "TransferedEvent"

    constructor(
        private readonly notification: NotificationGateway
    ) {}

    async handle(event: TransferedEvent): Promise<void> {
        await this.notification.sendMail(
            event.to.email
        )
    }
}