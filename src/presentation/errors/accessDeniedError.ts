class IAccessDeniedError extends Error {
  constructor () {
    super('Access denied')
    this.name = 'IAccessDeniedError'
  }
}

export { IAccessDeniedError }
