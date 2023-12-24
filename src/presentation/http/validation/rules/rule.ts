export default interface RuleValidator {
    validate(
        input: any
    ): string | boolean
}
