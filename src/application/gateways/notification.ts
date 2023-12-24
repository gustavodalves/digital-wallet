import Email from "../../domain/entities/email";

export default interface NotificationGateway {
    sendMail(email: Email): Promise<void>
}
