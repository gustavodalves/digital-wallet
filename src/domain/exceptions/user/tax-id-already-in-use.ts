export default class TaxIdAlreadyInUseError extends Error {
    constructor () {
      super('User tax id already in use')
    }
}
