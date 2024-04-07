import { Entity } from '@/core/entities/entity'
import { IUserProps } from './interfaces/IUserProps'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export class Student extends Entity<IUserProps> {
  static create(props: Optional<IUserProps, 'createdAt'>, id?: UniqueEntityID) {
    const student = new Student(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return student
  }

  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }

  get phone() {
    return this.props.phone
  }

  get age() {
    return this.props.age
  }

  get role() {
    return this.props.role
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }
}
