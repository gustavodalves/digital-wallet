import UserService from "../../../application/services/user";
import CreateUserController from "../../../presentation/http/controllers/create-user";

export default class CreateUserControllerFactory {
    constructor(
        private service: UserService
    ) {}

    generate() {
        return new CreateUserController(this.service)
    }
}
