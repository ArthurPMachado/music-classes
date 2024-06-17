/* eslint-disable prettier/prettier */
import { UseCaseError } from '@/core/errors/interfaces/use-case-error'

export class ForgotPasswordMailNotSentError
  extends Error
  implements UseCaseError {
  constructor() {
    super('Forgot password email failed to be sent')
  }
}
