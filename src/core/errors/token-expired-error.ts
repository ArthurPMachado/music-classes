import { UseCaseError } from './interfaces/use-case-error'

export class TokenExpiredError extends Error implements UseCaseError {
  constructor() {
    super('Token expirado')
  }
}
