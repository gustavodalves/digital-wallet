import { PrismaClient } from "@prisma/client"
import UserPrismaRepository from "../../../infra/database/prisma/repositories/User"

export default class UserRepositoryPrismaFactory {
    constructor(
        readonly prisma: PrismaClient
    ) {}

    generate() {
        return new UserPrismaRepository(this.prisma)
    }
}
