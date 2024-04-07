import { IUserProps } from '@/domain/enterprise/entities/interfaces/IUserProps'
import { User } from '@prisma/client'

export abstract class IUsersRepository {
  abstract findByEmail(email: string): Promise<IUserProps | null>
  abstract getTotalUsers(): Promise<User[]>
}
