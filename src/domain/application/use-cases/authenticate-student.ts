import { Injectable } from '@nestjs/common'
import { IStudentsRepository } from '../repositories/students-repository'
import { HashComparer } from '../cryptography/hash-comparer'
import { Encrypter } from '../cryptography/encrypter'
import {
  IAuthenticateUseCaseRequest,
  IAuthenticateUseCaseResponse,
} from './interfaces/IAuthenticateUseCase'
import { left, right } from '@/core/either'
import { WrongCredentialsError } from './errors/wrong-credentials-error'

@Injectable()
export class AuthenticateUseCase {
  constructor(
    private students: IStudentsRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: IAuthenticateUseCaseRequest): Promise<IAuthenticateUseCaseResponse> {
    const student = await this.students.findByEmail(email)

    if (!student) {
      return left(new WrongCredentialsError())
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      student.password,
    )

    if (!isPasswordValid) {
      return left(new WrongCredentialsError())
    }

    const accessToken = await this.encrypter.encrypt({
      sub: student.id.toString(),
    })

    return right({
      accessToken,
    })
  }
}
