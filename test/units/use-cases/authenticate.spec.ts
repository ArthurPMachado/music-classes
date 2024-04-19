import { AuthenticateUseCase } from '@/domain/application/use-cases/authenticate'
import { WrongCredentialsError } from '@/domain/application/use-cases/errors/wrong-credentials-error'
import { FakeEncrypter } from 'test/cryptography/fake-encrypter'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { makeStudent } from 'test/factories/make-student'
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository'

let inMemoryStudentsRepository: InMemoryStudentsRepository
let fakeHasher: FakeHasher
let fakeEncrypter: FakeEncrypter

let sut: AuthenticateUseCase

describe('Authenticate User', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    fakeHasher = new FakeHasher()
    fakeEncrypter = new FakeEncrypter()

    sut = new AuthenticateUseCase(inMemoryStudentsRepository, fakeHasher, fakeEncrypter)
  })

  it('Should be able to authenticate an student', async () => {
    const student = makeStudent({
      email: 'test@example',
      password: await fakeHasher.hash('123456'),
    })

    await inMemoryStudentsRepository.create(student)

    const result = await sut.execute({
      email: 'test@example',
      password: '123456'
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    })
  })

  it('Should not be able to authenticate if user does not exists', async () => {
    const result = await sut.execute({
      email: 'test@example',
      password: '123456'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toEqual(new WrongCredentialsError())
  })

  it('Should not be able to authenticate if password is invalid', async () => {
    const student = makeStudent({
      email: 'test@example',
      password: await fakeHasher.hash('123456'),
    })

    await inMemoryStudentsRepository.create(student)

    const result = await sut.execute({
      email: 'test@example',
      password: 'wrong password'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toEqual(new WrongCredentialsError())
  })
})
