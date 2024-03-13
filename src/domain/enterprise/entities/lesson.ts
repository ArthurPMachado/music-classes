import { Entity } from '@/core/entities/entity'
import { ILessonProps } from './interfaces/ILessonProps'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export class Lesson extends Entity<ILessonProps> {
  static create(
    props: Optional<ILessonProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const lesson = new Lesson(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return lesson
  }

  set title(title: string) {
    this.props.title = title
    this.registerUpdate()
  }

  get title() {
    return this.props.title
  }

  get link() {
    return this.props.link
  }

  set description(description: string) {
    this.props.description = description
    this.registerUpdate()
  }

  get description() {
    return this.props.description
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private registerUpdate() {
    this.props.updatedAt = new Date()
  }
}
