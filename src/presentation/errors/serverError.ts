class IServerError extends Error {
  constructor () {
    super('Internal Server Error')
    this.name = 'IServerError'
  }
}

export { IServerError }
