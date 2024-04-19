import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { DeleteStudentUseCase } from '@/domain/application/use-cases/delete-student'
import { makeStudent } from 'test/factories/make-student'
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository'

let inMemoryStudentsRepository: InMemoryStudentsRepository

let sut: DeleteStudentUseCase

describe('Delete Student Use Case', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()

    sut = new DeleteStudentUseCase(inMemoryStudentsRepository)
  })

  it('Should be able to delete a student', async () => {
    const studentToBeDeleted = makeStudent(
      {
        name: "Test name"
      },
      new UniqueEntityID('to-delete'))

    const studentToMaintain = makeStudent(
      {
        name: "Test name"
      },
      new UniqueEntityID('to-maintain'))

    await inMemoryStudentsRepository.create(studentToBeDeleted)
    await inMemoryStudentsRepository.create(studentToMaintain)

    await sut.execute({studentId: 'to-delete'})

    expect(inMemoryStudentsRepository.items).toHaveLength(1)
    expect(inMemoryStudentsRepository.items[0].id.toString()).toEqual('to-maintain')
  })
})
