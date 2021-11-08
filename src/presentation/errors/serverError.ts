class IServerError extends Error {
  constructor (stack: string) {
    super('Internal Server Error')
    this.name = 'IServerError'
    this.stack = stack
  }
}

export { IServerError }
