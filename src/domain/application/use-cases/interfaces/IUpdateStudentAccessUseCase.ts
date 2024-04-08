import { Either } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

export interface IUpdateStudentAccessUseCaseRequest {
  studentId: string
  hasAccess: boolean
}

export type IUpdateStudentAccessUseCaseResponse = Either<
  ResourceNotFoundError,
  null
>
