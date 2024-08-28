import { Either } from '@/core/either'

export interface IFetchStudentsUseCaseRequest {
  page: number
}

interface IStudents {
  id: string
  name: string
  email: string
  age: number
  phone: string
  createdAt: Date
  updatedAt: Date
}

export type IFetchStudentsUseCaseResponse = Either<
  null,
  {
    studentsResponse: IStudents[]
  }
>
