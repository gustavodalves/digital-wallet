export default class UUID {
    private readonly value: string

    constructor(
        id?: string
    ) {
        this.value = id || this.generateId()
    }

    getValue() {
        return this.value
    }

    private generateId() {
        return crypto.randomUUID()
    }
}
