import { left, right } from '@/core/either'
import { IStudentsRepository } from '../repositories/students-repository'
import {
  IDeleteStudentRequestUseCase,
  IDeleteStudentResponseUseCase,
} from './interfaces/IDeleteStudentUseCase'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'

@Injectable()
export class DeleteStudentUseCase {
  constructor(private studentsRepository: IStudentsRepository) {}

  async execute({
    studentId,
  }: IDeleteStudentRequestUseCase): Promise<IDeleteStudentResponseUseCase> {
    const student = await this.studentsRepository.findById(studentId)

    if (!student) {
      return left(new ResourceNotFoundError())
    }

    await this.studentsRepository.delete(student)

    return right(null)
  }
}
