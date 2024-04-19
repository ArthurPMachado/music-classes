import { Either } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

export interface IEditStudentUseCaseRequest {
  studentId: string
  name?: string
  email?: string
  phone?: string
  age?: number
}

export type IEditStudentUseCaseResponse = Either<ResourceNotFoundError, null>
