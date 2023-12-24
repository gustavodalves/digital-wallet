export default class EmailAlreadyInUseError extends Error {
    constructor () {
      super('User email already in use')
    }
}
