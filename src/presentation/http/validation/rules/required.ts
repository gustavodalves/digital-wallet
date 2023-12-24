import RuleValidator from "./rule";

export default class RequiredValidator implements RuleValidator {
    constructor(
        private readonly fieldName: string
    ) {}

    validate(input: any): string | boolean  {
        const value = input[this.fieldName]

        if(!value && value !== 0) return true

        return `${this.fieldName} is required`
    }
}
