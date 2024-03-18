import { Student } from '@/domain/enterprise/entities/student'

export interface ICreateStudentUseCaseRequest {
  name: string
  email: string
  password: string
}

export interface ICreateStudentUseCaseResponse {
  student: Student
}
