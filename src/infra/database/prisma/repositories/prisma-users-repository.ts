import { IUsersRepository } from '@/domain/application/repositories/users-repository'
import { IUserProps } from '@/domain/enterprise/entities/interfaces/IUserProps'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaStudentMapper } from '../mappers/prisma-student-mapper'
import { PrismaAdminMapper } from '../mappers/prisma-admin-mapper'

@Injectable()
export class PrismaUsersRepository implements IUsersRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<IUserProps> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      return null
    }

    if (user.role !== 'STUDENT') {
      return PrismaAdminMapper.toDomain(user)
    }

    return PrismaStudentMapper.toDomain(user)
  }

  async getTotalUsers(): Promise<IUserProps[]> {
    const users = await this.prisma.user.findMany()

    const mappedUsers = users.map((user) => PrismaStudentMapper.toDomain(user))

    return mappedUsers
  }
}
