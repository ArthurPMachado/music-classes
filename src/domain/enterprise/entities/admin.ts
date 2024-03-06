import { Entity } from '@/core/entity'
import { IUserProps } from './interfaces/IUserProps'
import { UniqueEntityID } from '@/core/unique-entity-id'

export class Admin extends Entity<IUserProps> {
  static create(props: IUserProps, id?: UniqueEntityID) {
    const admin = new Admin(
      {
        ...props,
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
}
