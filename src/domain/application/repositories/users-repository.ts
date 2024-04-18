import { Admin } from '@/domain/enterprise/entities/admin'
import { IUserProps } from '@/domain/enterprise/entities/interfaces/IUserProps'
import { Student } from '@/domain/enterprise/entities/student'

export abstract class IUsersRepository {
  abstract findByEmail(email: string): Promise<IUserProps | null>
  abstract getTotalUsers(): Promise<Student[] | Admin[]>
}
