import { PrismaClient } from "@prisma/client";
import { TransferRepository } from "../../../../domain/repositories/transfer";
import Transfer from "../../../../domain/entities/transfer";

export default class TransferPrismaRepository implements TransferRepository {
    constructor(
        private readonly prisma: PrismaClient
    ) {}

    async save(transfer: Transfer): Promise<void> {
        await this.prisma.transfer.create({
            data: {
                userFromId: transfer.from.uuid.getValue(),
                userToId: transfer.to.uuid.getValue(),
                value: transfer.value
            }
        })
    }
}
