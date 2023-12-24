import { Prisma, PrismaClient } from "@prisma/client";
import UnitOfWork from "../../../application/uow";

export default class PrismaUow implements UnitOfWork {
    public manager: Prisma.TransactionClient;

    constructor(private readonly prisma: PrismaClient) {
      this.manager = prisma;
    }
  
    async runInTransaction<T>(fn: (manager: any) => Promise<T>): Promise<T> {
      return await this.prisma.$transaction(async (manager) => {
        this.manager = manager;
        const res = await fn(manager);
        return res;
      });
    }
}