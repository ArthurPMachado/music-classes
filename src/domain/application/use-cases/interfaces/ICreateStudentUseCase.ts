import { Either } from '@/core/either'
import { Student } from '@/domain/enterprise/entities/student'
import { StudentAlreadyExistsError } from '../errors/student-already-exists-error'

export interface ICreateStudentUseCaseRequest {
  name: string
  email: string
  password: string
}

export type ICreateStudentUseCaseResponse = Either<
  StudentAlreadyExistsError,
  {
    student: Student
  }
>
