import { User as PrismaUser } from '@prisma/client'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Admin } from '@/domain/enterprise/entities/admin'

export class PrismaAdminMapper {
  static toDomain(raw: PrismaUser): Admin {
    const admin = Admin.create(
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

    return admin
  }
}
