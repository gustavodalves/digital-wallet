import UserService from "../../../application/services/user";
import { badRequest, created, notAcceptable, ok } from "../helpers/http-response";
import Controller from "../protocols/controller";
import HttpResponse from "../protocols/http-response";
import ValidatorComposite from "../validation/composite";
import RequiredValidator from "../validation/rules/required";

export default class TransferController implements Controller<
    TransferController.input,
    { message: string }
> {
    constructor(
        private readonly userService: UserService
    ) {}

    async handle(request: TransferController.input): Promise<HttpResponse<{ message: string; }>> {
        const compositeValidation = new ValidatorComposite([
            new RequiredValidator("payer"),
            new RequiredValidator("payee"),
            new RequiredValidator("value"),
        ])

        const errors = compositeValidation.validate(request)

        if(errors.length) return notAcceptable(
            errors
        )

        try {
            await this.userService.transfer(
                request.payer,
                request.payee,
                request.value
            )

            return ok({ message: "transfer executed" })
        } catch (error: any) {
            return badRequest(error.message)
        }
    }
}

export namespace TransferController {
    export type input = {
        value : number,
        payer : string,
        payee : string
    }
}
