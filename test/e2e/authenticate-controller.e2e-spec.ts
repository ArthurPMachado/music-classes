import request from 'supertest'
import { hash } from 'bcryptjs'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { PrismaService } from '@/infra/prisma/prisma.service'
import { AppModule } from '@/infra/app.module'

describe('Authenticate (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)

    await app.init()
  })

  test('[POST] /sessions', async () => {
    await prisma.user.create({
      data: {
        name: 'Fulano',
        email: 'fulanoteste@example.com',
        password: await hash('123456', 10),
        is_admin: false,
        has_permission: false,
      },
    })

    const response = await request(app.getHttpServer()).post('/sessions').send({
      email: 'fulanoteste@example.com',
      password: '123456',
    })

    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({
      access_token: expect.any(String),
    })
  })
})
