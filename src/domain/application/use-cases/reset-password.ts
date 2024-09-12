import { Injectable } from '@nestjs/common'
import { IStudentsRepository } from '../repositories/students-repository'
import { Encrypter } from '../cryptography/encrypter'
import { HashComparer } from '../cryptography/hash-comparer'
import { HashGenerator } from '../cryptography/hash-generator'
import {
  IJwtResetPassword,
  IResetPasswordUseCaseRequest,
  IResetPasswordUseCaseResponse,
} from './interfaces/IResetPasswordUseCase'
import { left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { SamePasswordError } from './errors/same-password-error'
import { Student } from '@/domain/enterprise/entities/student'

@Injectable()
export class ResetPassword {
  constructor(
    private studentsRepository: IStudentsRepository,
    private encrypter: Encrypter,
    private hashComparer: HashComparer,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    token,
    password,
  }: IResetPasswordUseCaseRequest): Promise<IResetPasswordUseCaseResponse> {
    const decoded = await this.encrypter.verify<IJwtResetPassword>(token)

    const student = await this.studentsRepository.findByEmail(decoded.email)

    if (!student) {
      return left(new ResourceNotFoundError())
    }

    const isPasswordTheSame = await this.hashComparer.compare(
      password,
      student.password,
    )

    if (isPasswordTheSame) {
      return left(new SamePasswordError())
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const updatedStudent = Student.create(
      {
        ...student,
        name: student.name,
        email: student.email,
        password: hashedPassword,
      },
      student.id,
    )

    await this.studentsRepository.save(updatedStudent)

    const message = 'Sua senha foi alterada com sucesso!'

    return right({
      message,
    })
  }
}
