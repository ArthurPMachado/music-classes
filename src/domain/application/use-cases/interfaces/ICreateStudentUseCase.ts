import { Either } from '@/core/either'
import { Student } from '@/domain/enterprise/entities/student'
import { StudentAlreadyExists } from '../errors/student-already-exists'

export interface ICreateStudentUseCaseRequest {
  name: string
  email: string
  password: string
}

export type ICreateStudentUseCaseResponse = Either<
  StudentAlreadyExists,
  {
    student: Student
  }
>
