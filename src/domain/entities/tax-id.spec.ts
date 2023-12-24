import TaxId, { CnpjSpecification } from "./tax-id"

describe(
    'Tax Id',
() => {
    it('shoud be able create cnpj tax id', () => {
        const cnpj = '06453520000136'

        const taxId = new TaxId(cnpj)

        expect(taxId.getValue()).toBe(cnpj)
    })

    it('shoud be able create cpf tax id', () => {
        const cnpj = '99460782019'

        const taxId = new TaxId(cnpj)

        expect(taxId.getValue()).toBe(cnpj)
    })

    it('shoud not be able create invalid cpf tax id', () => {
        const cnpj = '994607820199'
        expect(() => new TaxId(cnpj)).toThrow()
    })

    it('shoud not be able create invalid cnpj tax id', () => {
        const cnpj = '9946078233320199'
        expect(() => new TaxId(cnpj)).toThrow()
    })
})
