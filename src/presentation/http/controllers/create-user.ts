import UserService from "../../../application/services/user";
import { badRequest, created, notAcceptable } from "../helpers/http-response";
import Controller from "../protocols/controller";
import HttpResponse from "../protocols/http-response";
import ValidatorComposite from "../validation/composite";
import RequiredValidator from "../validation/rules/required";

export default class CreateUserController implements Controller<
    CreateUserController.input,
    { message: string }
> {
    constructor(
        private userService: UserService
    ) {
    }

    async handle(request: CreateUserController.input): Promise<HttpResponse<{ message: string; }>> {
        const compositeValidation = new ValidatorComposite([
            new RequiredValidator("email"),
            new RequiredValidator("name"),
            new RequiredValidator("password"),
            new RequiredValidator("taxId"),
            new RequiredValidator("role")
        ])

        const errors = compositeValidation.validate(request)

        if(errors.length) return notAcceptable(
            errors
        )

        try {
            await this.userService.createUser({
                email: request.email,
                name: request.name,
                password: request.password,
                taxId: request.taxId
            }, request.role)

            return created({
                message: "user created"
            })
        } catch (error: any) {
            return badRequest(error.message)
        }
    }
}

export namespace CreateUserController {
    export type input = {
        email: string
        password: string
        name: string
        role: string
        taxId: string
    }
}
