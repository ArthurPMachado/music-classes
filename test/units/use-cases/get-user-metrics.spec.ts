import { FetchStudentsUseCase } from '@/domain/application/use-cases/fetch-students'
import { GetUsersMetricsUseCase } from '@/domain/application/use-cases/get-users-metrics'
import { makeStudent } from 'test/factories/make-student'
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository'

let inMemoryStudentsRepository: InMemoryStudentsRepository

let sut: GetUsersMetricsUseCase

describe('Get Users Metrics', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()

    sut = new GetUsersMetricsUseCase(inMemoryStudentsRepository)
  })

  it('Should be able to get users metrics', async () => {
    await inMemoryStudentsRepository.create(makeStudent({
      hasAccess: true
    }))
    await inMemoryStudentsRepository.create(makeStudent({
      hasAccess: true
    }))
    await inMemoryStudentsRepository.create(makeStudent({
      hasAccess: false
    }))

    const result = await sut.execute()

    expect(result.isRight()).toBe(true)
    expect(result.value.totalUsers).toEqual(3)
    expect(result.value.totalUsersWithAccess).toEqual(2)
  })
})
