import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface IUserProps {
  id?: UniqueEntityID
  name: string
  email: string
  password: string
  phone?: string | null
  age?: number | null
  role?: string | null
  createdAt: Date
  updatedAt?: Date | null
  hasAccess: boolean
}
