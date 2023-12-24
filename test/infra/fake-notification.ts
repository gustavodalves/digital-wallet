import NotificationGateway from "../../src/application/gateways/notification";
import TransactionValidator from "../../src/application/gateways/transaction-validator";
import UUID from "../../src/domain/building-blocks/object-values/id";
import Email from "../../src/domain/entities/email";

export default class FakeNotificationGateway implements NotificationGateway {
    async sendMail(email: Email): Promise<void> {
        console.log('email sended to '+ email.getValue())
    }
}
