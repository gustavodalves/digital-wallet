import { PrismaClient, Transaction } from "@prisma/client";
import User, { CommomUser, ShopkeeperUser } from "../../../../domain/entities/user";
import UserRepository from "../../../../domain/repositories/user";
import Wallet from "../../../../domain/entities/wallet";
import Transfer, { ReceiveTransfer, SendTransfer } from "../../../../domain/entities/transaction";

class UserRoleFactory {
    static generate(input: {
        id: string
        email: string,
        taxId: string,
        name: string,
        transactions: { id: string; value: number; type: string; createdAt: Date; }[],
        password: string,
        role: string
    }) {
        const wallet = new Wallet(
            input.transactions.map(item => {
                if(item.type=== "Receive") return new ReceiveTransfer(item.value, item.id)

                return new SendTransfer(item.value, item.id)
            })
        )
        if(input.role === "Commom") return CommomUser.recover({ ...input, wallet })
        return ShopkeeperUser.recover({ ...input, wallet })
    }
}

export default class UserPrismaRepository implements UserRepository {
    constructor(
        private readonly prisma: PrismaClient
    ) {}

    async getByEmail(email: string): Promise<User | undefined> {
        const rawData = await this.prisma.user.findUnique({
            where: { email },
            include: {
                From: true,
                To: true,
                Transaction: true
            }
        })

        if(!rawData) return

        return UserRoleFactory.generate({
            email: rawData.email,
            id: rawData.id,
            name: rawData.name,
            password: rawData.password,
            role: rawData.role,
            taxId: rawData.taxId,
            transactions: rawData.Transaction,
        })
    }

    async getByTaxId(taxId: string): Promise<User | undefined> {
        const rawData = await this.prisma.user.findUnique({
            where: { taxId },
            include: {
                From: true,
                To: true,
                Transaction: true
            }
        })

        if(!rawData) return

        return UserRoleFactory.generate({
            email: rawData.email,
            id: rawData.id,
            name: rawData.name,
            password: rawData.password,
            role: rawData.role,
            taxId: rawData.taxId,
            transactions: rawData.Transaction
        })
    }

    async save(user: User): Promise<void> {
        const userRole = user instanceof CommomUser ? "Commom" : "Shopkeeper"
        await this.prisma.user.create({
            data: {
                email: user.email.getValue(),
                name: user.name,
                password: user.password.value,
                taxId: user.taxId.getValue(),
                createdAt: new Date(),
                role: userRole,
            }
        })
    }

    async update(user: User): Promise<void> {
        await this.prisma.user.update({
            where: {taxId: user.taxId.getValue()},
            data: {
                password: user.password.value,
            }
        })

        const transactions = await this.prisma.transaction.findMany({
            where: { userId: user.uuid.getValue() }
        })

        const newTransactions = user.wallet.getTransfers().filter(item => (
            !transactions.find(transaction => transaction.id === item.uuid.getValue())
        ))

        for (const iterator of newTransactions) {
            await this.prisma.transaction.create({
                data: {
                    type: iterator.type,
                    createdAt: new Date(),
                    value: iterator.value,
                    userId: user.uuid.getValue(),
                    id: iterator.uuid.getValue()
                }
            })
        }
    }
}
