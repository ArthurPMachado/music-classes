import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { IStudentsRepository } from '@/domain/application/repositories/students-repository'
import { IPaginationParams } from '@/core/repositories/pagination-params'
import { Student } from '@/domain/enterprise/entities/student'
import { PrismaStudentMapper } from '../mappers/prisma-student-mapper'
import { IUserProps } from '@/domain/enterprise/entities/interfaces/IUserProps'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

@Injectable()
export class PrismaStudentsRepository implements IStudentsRepository {
  constructor(private prisma: PrismaService) {}

  async create(student: Student): Promise<void> {
    const data = PrismaStudentMapper.toPrisma(student)

    await this.prisma.user.create({
      data,
    })
  }

  async findByEmail(email: string): Promise<Student> {
    const student = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!student) {
      return null
    }

    return PrismaStudentMapper.toDomain(student)
  }

  async findMany({ page }: IPaginationParams): Promise<Student[]> {
    const students = await this.prisma.user.findMany({
      skip: (page - 1) * 20,
      take: 20,
    })

    return students.map(PrismaStudentMapper.toDomain)
  }

  async findById(id: string): Promise<Student> {
    const student = await this.prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (!student) {
      return null
    }

    return PrismaStudentMapper.toDomain(student)
  }

  async delete(student: Student): Promise<void> {
    await this.prisma.user.delete({
      where: {
        id: student.id.toString(),
      },
    })
  }

  async save(student: Student): Promise<void> {
    const data = PrismaStudentMapper.toPrisma(student)

    await this.prisma.user.update({
      where: {
        id: student.id.toString(),
      },
      data,
    })
  }

  async getTotalUsers(): Promise<IUserProps[]> {
    const usersDB = await this.prisma.user.findMany()

    const usersResult = usersDB.map((item) => {
      const user = {
        ...item,
        id: new UniqueEntityID(item.id),
      }

      return user
    })

    return usersResult
  }
}
