import { Either } from '@/core/either'
import { Student } from '@/domain/enterprise/entities/student'

export interface IFetchStudentsUseCaseRequest {
  page: number
}

export type IFetchStudentsUseCaseResponse = Either<
  null,
  {
    students: Student[]
  }
>
