import { Entity } from '@/core/entities/entity'
import { IUserProps } from './interfaces/IUserProps'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export class Admin extends Entity<IUserProps> {
  static create(props: IUserProps, id?: UniqueEntityID) {
    const admin = new Admin(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        role: 'ADMIN',
      },
      id,
    )

    return admin
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
