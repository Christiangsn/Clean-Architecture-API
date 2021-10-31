import { IEmailValidator } from '../presentation/protocol/emailValidator'

export class EmailValidatorAdapter implements IEmailValidator {
  isValid (email: string): boolean {
    return false
  }
}
