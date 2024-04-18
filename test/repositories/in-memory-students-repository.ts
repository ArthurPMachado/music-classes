import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { IPaginationParams } from '@/core/repositories/pagination-params'
import { IStudentsRepository } from '@/domain/application/repositories/students-repository'
import { Student } from '@/domain/enterprise/entities/student'

export class InMemoryStudentsRepository implements IStudentsRepository {
  public items: Student[] = []

  async create(student: Student) {
    this.items.push(student)
  }

  async findByEmail(email: string) {
    const student = this.items.find((item) => item.email === email)

    if (!student) {
      return null
    }

    return student
  }

  async findMany({ page }: IPaginationParams) {
    const students = this.items.slice((page - 1) * 20, page * 20)

    return students
  }

  async findById(id: string) {
    const student = this.items.find(
      (item) => item.id === new UniqueEntityID(id),
    )

    if (!student) {
      return null
    }

    return student
  }

  async delete(student: Student) {
    const studentIndex = this.items.findIndex((item) => item.id === student.id)

    this.items.splice(studentIndex, 1)
  }

  async save(student: Student) {
    const studentIndex = this.items.findIndex((item) => item.id === student.id)

    this.items[studentIndex] = student
  }

  async getTotalUsers() {
    return this.items
  }
}
