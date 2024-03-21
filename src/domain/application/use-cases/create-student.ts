import { Student } from '@/domain/enterprise/entities/student'
import { IStudentsRepository } from '../repositories/students-repository'
import {
  ICreateStudentUseCaseRequest,
  ICreateStudentUseCaseResponse,
} from './interfaces/ICreateStudentUseCase'
import { left, right } from '@/core/either'
import { StudentAlreadyExistsError } from './errors/student-already-exists-error'
import { HashGenerator } from '../cryptography/hash-generator'
import { Injectable } from '@nestjs/common'

@Injectable()
export class CreateStudentUseCase {
  constructor(
    private studentsRepository: IStudentsRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    email,
    password,
  }: ICreateStudentUseCaseRequest): Promise<ICreateStudentUseCaseResponse> {
    const studentWithSameEmail =
      await this.studentsRepository.findByEmail(email)

    if (studentWithSameEmail) {
      return left(new StudentAlreadyExistsError(email))
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const student = Student.create({
      name,
      email,
      password: hashedPassword,
    })

    await this.studentsRepository.create(student)

    return right({
      student,
    })
  }
}
