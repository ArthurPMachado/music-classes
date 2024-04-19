import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { IUserProps } from '@/domain/enterprise/entities/interfaces/IUserProps'
import { Student } from '@/domain/enterprise/entities/student'

export function makeStudent(
  override: Partial<IUserProps> = {},
  id?: UniqueEntityID,
) {
  const student = Student.create(
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      ...override,
    },
    id,
  )

  return student
}
