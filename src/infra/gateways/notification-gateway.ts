import NotificationGateway from "../../application/gateways/notification";
import Email from "../../domain/entities/email";
import HttpClient from "../http-client/http-client";

export default class NotificationMocky implements NotificationGateway {
    constructor(
        private readonly httpClient: HttpClient
    ) {}

    async sendMail(email: Email): Promise<void> {
        this.httpClient.post('http://o4d9z.mocklab.io/notify', {
            email
        })
    }
}
