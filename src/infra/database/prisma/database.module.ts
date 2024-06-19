import { Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { IStudentsRepository } from '@/domain/application/repositories/students-repository'
import { PrismaStudentsRepository } from './repositories/prisma-students-repository'
import { IUsersRepository } from '@/domain/application/repositories/users-repository'
import { PrismaUsersRepository } from './repositories/prisma-users-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: IStudentsRepository,
      useClass: PrismaStudentsRepository,
    },
    {
      provide: IUsersRepository,
      useClass: PrismaUsersRepository,
    },
  ],
  exports: [PrismaService, IStudentsRepository, IUsersRepository],
})
export class DatabaseModule {}
