export class IAnauthorizedError extends Error {
  constructor () {
    super('Anauthorized')
    this.name = 'AnauthorizedError'
  }
}
