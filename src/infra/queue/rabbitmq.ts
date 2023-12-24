import DomainEvent from "../../domain/building-blocks/event";
import Queue from "./queue";

import amqplib from 'amqplib';

export default class RabbitMQQueueAdapter implements Queue {
    connection: any;

    constructor(
        private readonly url: string
    ) {}

    async connect(): Promise<void> {
        this.connection = await amqplib.connect(this.url);
    }

    async close(): Promise<void> {
        await this.connection.close();
    }

    async on(eventName: string, callback: Function): Promise<void> {
        const channel = await this.connection.createChannel();
        await channel.assertQueue(eventName, { durable: true });
        await channel.consume(eventName, async function (msg: any) {
            if (msg) {
                const input = JSON.parse(msg.content.toString());
                await callback(input);
                channel.ack(msg);
            }
        });
    }

    async publish(event: DomainEvent): Promise<void> {
        const channel = await this.connection.createChannel();
        await channel.assertQueue(event.eventName, { durable: true });
        channel.sendToQueue(event.eventName, Buffer.from(JSON.stringify(event)));
        await channel.close();
    }
}
