import Transfer from "../../src/domain/entities/transfer";
import { TransferRepository } from "../../src/domain/repositories/transfer";

export class FakeTransferRepository implements TransferRepository {
    private readonly transfers: Transfer[] = []

    async save(transfer: Transfer): Promise<void> {
        this.transfers.push(transfer)
    }
}