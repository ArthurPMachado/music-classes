import { right } from '@/core/either'
import { IStudentsRepository } from '../repositories/students-repository'
import {
  IFetchStudentsUseCaseRequest,
  IFetchStudentsUseCaseResponse,
} from './interfaces/IFetchStudentsUseCase'
import { Injectable } from '@nestjs/common'

@Injectable()
export class FetchStudentsUseCase {
  constructor(private studentsRepository: IStudentsRepository) {}

  async execute({
    page,
  }: IFetchStudentsUseCaseRequest): Promise<IFetchStudentsUseCaseResponse> {
    const students = await this.studentsRepository.findMany({ page })

    const studentsResponse = students.map((student) => {
      return {
        id: student.id.toString(),
        name: student.name,
        email: student.email,
        age: student.age,
        phone: student.phone,
        createdAt: student.createdAt,
        updatedAt: student.updatedAt,
      }
    })

    return right({
      studentsResponse,
    })
  }
}
