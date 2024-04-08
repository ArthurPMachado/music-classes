import { Entity } from '@/core/entities/entity'
import { IUserProps } from './interfaces/IUserProps'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Roles } from '@/core/enums/user-roles'
import { Optional } from '@/core/types/optional'

export class Admin extends Entity<IUserProps> {
  static create(
    props: Optional<IUserProps, 'createdAt' | 'hasAccess'>,
    id?: UniqueEntityID,
  ) {
    const admin = new Admin(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        role: Roles.ADMIN,
        hasAccess: true,
      },
      id,
    )

    return admin
  }

  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  get email() {
    return this.props.email
  }

  set email(email: string) {
    this.props.email = email
    this.touch()
  }

  get password() {
    return this.props.password
  }

  get phone() {
    return this.props.phone
  }

  set phone(phone: string) {
    this.props.phone = phone
    this.touch()
  }

  get age() {
    return this.props.age
  }

  set age(age: number) {
    this.props.age = age
    this.touch()
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

  get hasAccess() {
    return this.props.hasAccess
  }

  set hasAccess(hasAccess: boolean) {
    this.props.hasAccess = hasAccess
    this.touch()
  }

  private touch() {
    this.props.updatedAt = new Date()
  }
}
