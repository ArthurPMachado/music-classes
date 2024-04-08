import { Student } from '@/domain/enterprise/entities/student'
import { IUsersRepository } from './users-repository'
import { IPaginationParams } from '@/core/repositories/pagination-params'

export abstract class IStudentsRepository extends IUsersRepository {
  abstract create(student: Student): Promise<void>
  abstract findByEmail(email: string): Promise<Student | null>
  abstract findMany({ page }: IPaginationParams): Promise<Student[]>
  abstract findById(id: string): Promise<Student | null>
  abstract delete(student: Student): Promise<void>
}
