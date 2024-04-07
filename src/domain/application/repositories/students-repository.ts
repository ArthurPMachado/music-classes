import { Student } from '@/domain/enterprise/entities/student'
import { IUsersRepository } from './users-repository'

export abstract class IStudentsRepository extends IUsersRepository {
  abstract create(student: Student): Promise<void>
  abstract findByEmail(email: string): Promise<Student | null>
  abstract findMany(page: number): Promise<Student[]>
}
