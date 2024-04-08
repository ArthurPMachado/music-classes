import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { IStudentsRepository } from '../repositories/students-repository'
import { left, right } from '@/core/either'
import {
  IUpdateStudentAccessUseCaseRequest,
  IUpdateStudentAccessUseCaseResponse,
} from './interfaces/IUpdateStudentAccessUseCase'

export class UpdateStudentPermissionUseCase {
  constructor(private studentsRepository: IStudentsRepository) {}

  async execute({
    studentId,
    hasAccess,
  }: IUpdateStudentAccessUseCaseRequest): Promise<IUpdateStudentAccessUseCaseResponse> {
    const student = await this.studentsRepository.findById(studentId)

    if (!student) {
      return left(new ResourceNotFoundError())
    }

    student.hasAccess = hasAccess

    await this.studentsRepository.save(student)

    return right(null)
  }
}
