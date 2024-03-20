import { Student } from '@/domain/enterprise/entities/student'
import { IStudentsRepository } from '../repositories/students-repository'
import {
  ICreateStudentUseCaseRequest,
  ICreateStudentUseCaseResponse,
} from './interfaces/ICreateStudentUseCase'
import { left, right } from '@/core/either'
import { StudentAlreadyExists } from './errors/student-already-exists'

export class CreateStudent {
  constructor(private studentsRepository: IStudentsRepository) {}

  async execute({
    name,
    email,
    password,
  }: ICreateStudentUseCaseRequest): Promise<ICreateStudentUseCaseResponse> {
    const studentWithSameEmail =
      await this.studentsRepository.findByEmail(email)

    if (studentWithSameEmail) {
      return left(new StudentAlreadyExists(email))
    }

    const student = Student.create({
      name,
      email,
      password,
    })

    await this.studentsRepository.create(student)

    return right({
      student,
    })
  }
}
