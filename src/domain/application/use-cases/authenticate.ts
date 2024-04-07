import { Injectable } from '@nestjs/common'
import { HashComparer } from '../cryptography/hash-comparer'
import { Encrypter } from '../cryptography/encrypter'
import {
  IAuthenticateUseCaseRequest,
  IAuthenticateUseCaseResponse,
} from './interfaces/IAuthenticateUseCase'
import { left, right } from '@/core/either'
import { WrongCredentialsError } from './errors/wrong-credentials-error'
import { IUsersRepository } from '../repositories/users-repository'

@Injectable()
export class AuthenticateUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: IAuthenticateUseCaseRequest): Promise<IAuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      return left(new WrongCredentialsError())
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      user.password,
    )

    if (!isPasswordValid) {
      return left(new WrongCredentialsError())
    }

    const accessToken = await this.encrypter.encrypt({
      sub: user.id.toString(),
      role: user.role,
    })

    return right({
      accessToken,
    })
  }
}
