import { IUserProps } from '@/domain/enterprise/entities/interfaces/IUserProps'

export abstract class IUsersRepository {
  abstract findByEmail(email: string): Promise<IUserProps | null>
}
