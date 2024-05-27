import { User as PrismaUser, Prisma } from '@prisma/client'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Student } from '@/domain/enterprise/entities/student'
import { Roles } from '@/core/enums/user-roles'

export class PrismaStudentMapper {
  static toDomain(raw: PrismaUser): Student {
    const student = Student.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
        phone: raw.phone,
        age: raw.age,
        role: raw.role,
        hasAccess: raw.hasAccess,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )

    return student
  }

  static toPrisma(student: Student): Prisma.UserUncheckedCreateInput {
    return {
      id: student.id.toString(),
      name: student.name,
      email: student.email,
      password: student.password,
      phone: student.phone,
      age: student.age,
      hasAccess: student.hasAccess,
      role: Roles[student.role],
      createdAt: student.createdAt,
      updatedAt: student.updatedAt,
    }
  }
}
