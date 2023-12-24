import UserService from "../../../application/services/user";
import Route from "../../../infra/http-server/route";
import Controller from "../../../presentation/http/protocols/controller";

export default class TransferRoute extends Route {
    constructor(
        controller: Controller
    ) {
        super(
            "post",
            "/transfer",
            controller
        )
    }
}
