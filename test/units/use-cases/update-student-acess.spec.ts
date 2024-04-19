import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { UpdateStudentAccessUseCase } from '@/domain/application/use-cases/update-student-access'
import { makeStudent } from 'test/factories/make-student'
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository'

let inMemoryStudentsRepository: InMemoryStudentsRepository

let sut: UpdateStudentAccessUseCase

describe('Update Student Access', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()

    sut = new UpdateStudentAccessUseCase(inMemoryStudentsRepository)
  })

  it('Should be able to update student access to platform', async () => {
    const student = makeStudent(
      {
        hasAccess: false
      },
      new UniqueEntityID('to-update'))
    
    await inMemoryStudentsRepository.create(student)

    await sut.execute({
      studentId: 'to-update',
      hasAccess: true
    })

    expect(inMemoryStudentsRepository.items[0].hasAccess).toBe(true)
  })

  it('Should not be able to update student access if student does not exists', async () => {
    const result = await sut.execute({
      studentId: 'to-update',
      hasAccess: true
    })

    expect(result.isRight()).toBe(false)
    expect(result.value).toEqual(new ResourceNotFoundError())
  })
})
