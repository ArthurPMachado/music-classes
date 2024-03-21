import { Either } from '@/core/either'
import { WrongCredentialsError } from '../errors/wrong-credentials-error'

export interface IAuthenticateUseCaseRequest {
  email: string
  password: string
}

export type IAuthenticateUseCaseResponse = Either<
  WrongCredentialsError,
  {
    accessToken: string
  }
>
