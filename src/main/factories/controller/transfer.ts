import UserService from "../../../application/services/user";
import TransferController from "../../../presentation/http/controllers/transfer";

export default class TransferControllerFactory {
    constructor(
        readonly service: UserService
    ) {}

    generate() {
        return new TransferController(this.service)
    }
}
