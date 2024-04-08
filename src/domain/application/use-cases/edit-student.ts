import { left, right } from '@/core/either'
import { IStudentsRepository } from '../repositories/students-repository'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import {
  IEditStudentUseCaseRequest,
  IEditStudentUseCaseResponse,
} from './interfaces/IEditStudentUseCase'

export class EditStudentUseCase {
  constructor(private studentsRepository: IStudentsRepository) {}

  async execute({
    studentId,
    name,
    email,
    phone,
    age,
  }: IEditStudentUseCaseRequest): Promise<IEditStudentUseCaseResponse> {
    const student = await this.studentsRepository.findById(studentId)

    if (!student) {
      return left(new ResourceNotFoundError())
    }

    student.name = name
    student.email = email
    student.phone = phone
    student.age = age

    await this.studentsRepository.save(student)

    return right(null)
  }
}
