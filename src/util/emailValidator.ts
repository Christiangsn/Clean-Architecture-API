import { IEmailValidator } from '../presentation/protocol/emailValidator'
import validator from 'validator'

export class EmailValidatorAdapter implements IEmailValidator {
  isValid (email: string): boolean {
    return validator.isEmail('')
  }
}
