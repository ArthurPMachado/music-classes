import { Either } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

export interface IDeleteStudentRequestUseCase {
  studentId: string
}

export type IDeleteStudentResponseUseCase = Either<ResourceNotFoundError, null>
