
class IInvalidTokenError extends Error {
  constructor () {
    super('Anauthorized')
    this.name = 'IInvalidTokenError'
  }
}

export { IInvalidTokenError }
