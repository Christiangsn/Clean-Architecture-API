class IInvalidParamsError extends Error {
  constructor (paramName: string) {
    super(`Invalid param: ${paramName}`)
    this.name = 'MissingParamError'
  }
}

export { IInvalidParamsError }
