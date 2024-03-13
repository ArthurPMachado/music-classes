import { UniqueEntityID } from './unique-entity-id'

export abstract class Entity<Props> {
  protected _id: UniqueEntityID
  protected props: Props

  protected constructor(props: Props, _id?: UniqueEntityID) {
    this.props = props
    this._id = _id ?? new UniqueEntityID()
  }

  get id(): UniqueEntityID {
    return this._id
  }

  public equals(entity: Entity<unknown>) {
    if (entity === this) {
      return true
    }

    if (entity.id === this._id) {
      return true
    }

    return false
  }
}
