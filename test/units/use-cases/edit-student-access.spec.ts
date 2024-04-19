import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { EditStudentUseCase } from '@/domain/application/use-cases/edit-student'
import { makeStudent } from 'test/factories/make-student'
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository'

let inMemoryStudentsRepository: InMemoryStudentsRepository

let sut: EditStudentUseCase

describe('Update Student Data', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()

    sut = new EditStudentUseCase(inMemoryStudentsRepository)
  })

  it('Should be able to update student data', async () => {
    const student = makeStudent(
      {
        hasAccess: false
      },
      new UniqueEntityID('to-update'))
    
    await inMemoryStudentsRepository.create(student)

    await sut.execute({
      studentId: 'to-update',
      name: 'Test name',
      email: 'Test email',
    })

    expect(inMemoryStudentsRepository.items[0].name).toEqual('Test name')
    expect(inMemoryStudentsRepository.items[0].email).toEqual('Test email')
  })

  it('Should not be able to update student data if student does not exists', async () => {
    const result = await sut.execute({
      studentId: 'to-update',
      name: 'Test name',
      email: 'Test email',
    })

    expect(result.isRight()).toBe(false)
    expect(result.value).toEqual(new ResourceNotFoundError())
  })
})
