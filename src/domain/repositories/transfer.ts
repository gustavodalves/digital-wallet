import Transfer from "../entities/transfer";

export interface TransferRepository {
    save(transfer: Transfer): Promise<void>
}