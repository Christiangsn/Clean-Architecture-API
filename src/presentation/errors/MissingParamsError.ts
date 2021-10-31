
class MissingParamError extends Error {
  constructor (paramName: string) {
    super(`Missin param: ${paramName}`)
    this.name = 'MissingParamError'
  }
}

export { MissingParamError }
