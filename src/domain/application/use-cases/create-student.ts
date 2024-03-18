import { Student } from '@/domain/enterprise/entities/student'
import { IStudentsRepository } from '../repositories/students-repository'
import {
  ICreateStudentUseCaseRequest,
  ICreateStudentUseCaseResponse,
} from './interfaces/ICreateStudentUseCase'

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
      throw new Error('Student already exists')
    }

    const student = Student.create({
      name,
      email,
      password,
    })

    await this.studentsRepository.create(student)

    return {
      student,
    }
  }
}
