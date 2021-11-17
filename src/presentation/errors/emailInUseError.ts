class IEmailInUseError extends Error {
  constructor () {
    super('The received email is already in use')
    this.stack = 'EmailInUseError'
  }
}

export { IEmailInUseError }
