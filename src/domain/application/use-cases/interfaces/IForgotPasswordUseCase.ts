import { Either } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { ForgotPasswordMailNotSentError } from '../errors/forgot-password-mail-not-sent-error'

export interface IForgotPasswordUseCaseRequest {
  email: string
}

export type IForgotPasswordUseCaseResponse = Either<
  ResourceNotFoundError | ForgotPasswordMailNotSentError,
  null
>
