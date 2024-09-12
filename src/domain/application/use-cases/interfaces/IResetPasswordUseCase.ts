import { Either } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

export interface IResetPasswordUseCaseRequest {
  token: string
  password: string
}

export type IResetPasswordUseCaseResponse = Either<
  ResourceNotFoundError,
  Record<string, string>
>

export interface IJwtResetPassword {
  email: string
}
