import RuleValidator from "./rules/rule";

export default class ValidatorComposite  {
    constructor(
        private readonly rules: RuleValidator[]
    ) {}

    validate(input: any) {
        const errors: string[] = []

        for (const rule of this.rules) {
            const validate = rule.validate(input)

            if(typeof validate === "boolean") {
                continue
            }

            errors.push(validate)
        }

        return errors
    }
}
