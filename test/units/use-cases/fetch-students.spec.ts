import { FetchStudentsUseCase } from '@/domain/application/use-cases/fetch-students'
import { makeStudent } from 'test/factories/make-student'
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository'

let inMemoryStudentsRepository: InMemoryStudentsRepository

let sut: FetchStudentsUseCase

describe('Fetch Students Use Case', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()

    sut = new FetchStudentsUseCase(inMemoryStudentsRepository)
  })

  it('Should be able to fetch students', async () => {
    await inMemoryStudentsRepository.create(makeStudent({
      createdAt: new Date(2024, 2, 15)
    }))
    await inMemoryStudentsRepository.create(makeStudent({
      createdAt: new Date(2024, 2, 20)
    }))
    await inMemoryStudentsRepository.create(makeStudent({
      createdAt: new Date(2024, 2, 30)
    }))

    const result = await sut.execute({ page: 1 })

    expect(result.isRight()).toBe(true)
    expect(result.value.students).toHaveLength(3)
    expect(result.value.students).toEqual([
      expect.objectContaining({createdAt: new Date(2024, 2, 15)}),
      expect.objectContaining({createdAt: new Date(2024, 2, 20)}),
      expect.objectContaining({createdAt: new Date(2024, 2, 30)})
    ])
  })
  
  it('Should be able to fetch paginated students', async () => {
    for (let index = 0; index <= 25; index++) {
      await inMemoryStudentsRepository.create(makeStudent())
    }

    const result = await sut.execute({ page: 2 })

    expect(result.isRight()).toBe(true)
    expect(result.value.students).toHaveLength(6)
  })
})
