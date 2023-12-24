import { PrismaClient } from "@prisma/client"
import TransferPrismaRepository from "../../../infra/database/prisma/repositories/Transfer"

export default class TransferRepositoryPrismaFactory {
    constructor(
        readonly prisma: PrismaClient
    ) {}

    generate() {
        return new TransferPrismaRepository(this.prisma)
    }
}
