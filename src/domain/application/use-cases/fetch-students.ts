import { right } from '@/core/either'
import { IStudentsRepository } from '../repositories/students-repository'
import {
  IFetchStudentsUseCaseRequest,
  IFetchStudentsUseCaseResponse,
} from './interfaces/IFetchStudentsUseCase'

export class FetchStudentsUseCase {
  constructor(private studentsRepository: IStudentsRepository) {}

  async execute({
    page,
  }: IFetchStudentsUseCaseRequest): Promise<IFetchStudentsUseCaseResponse> {
    const students = await this.studentsRepository.findMany(page)

    return right({
      students,
    })
  }
}
