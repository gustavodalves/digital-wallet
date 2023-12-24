import Entity from "../building-blocks/entity";
import UUID from "../building-blocks/object-values/id";
import Email from "./email";
import Password from "./password";
import TaxId from "./tax-id";
import Wallet from "./wallet";

export class UserId extends UUID {}

export interface ReceiveTransfer {
    receiveTransfe(amount: number): void
}

export abstract class SendTransfer {
    abstract sendMoney(amount: number): void
}

export type CreateCommand = {
    name: string
    email: string
    taxId: string
    password: string
}

export type RecoverCommand = {
    id: string
    name: string
    email: string
    taxId: string
    password: string
    wallet: Wallet,
}

export default abstract class User extends Entity implements ReceiveTransfer {

    protected constructor(
        id: UserId,
        public name: string,
        public email: Email,
        public taxId: TaxId,
        public password: Password,
        public readonly wallet: Wallet,
    ) {
        super(id)
    }

    protected createUser() {}

    receiveTransfe(amount: number): void {
        this.wallet.receiveMoney(amount)
    }

    toJson() {
        return {
            id: this.uuid.getValue(),
            name: this.name,
            email: this.email.getValue(),
            taxId: this.taxId.getValue(),
            balance: this.wallet.getTotal()
        }
    }
}

export class ShopkeeperUser extends User {
    static async create(input: CreateCommand) {
        return new ShopkeeperUser(
            new UserId(),
            input.name,
            new Email(input.email),
            new TaxId(input.taxId),
            await Password.create(input.password),
            new Wallet(),
        )
    }

    static recover(input: RecoverCommand) {
        return new ShopkeeperUser(
            new UserId(input.id),
            input.name,
            new Email(input.email),
            new TaxId(input.taxId),
            new Password(input.password),
            input.wallet,
        )
    }
}

export class CommomUser extends User implements SendTransfer {
    sendMoney(amount: number): void {
        this.wallet.sendMoney(amount)
    }

    static async create(input: CreateCommand) {
        return new CommomUser(
            new UserId(),
            input.name,
            new Email(input.email),
            new TaxId(input.taxId),
            await Password.create(input.password),
            new Wallet(),
        )
    }

    static recover(input: RecoverCommand) {
        return new CommomUser(
            new UserId(input.id),
            input.name,
            new Email(input.email),
            new TaxId(input.taxId),
            new Password(input.password),
            input.wallet,
        )
    }
}
