import request from 'supertest'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { PrismaService } from '@/infra/prisma/prisma.service'
import { AppModule } from '@/infra/app.module'
import { JwtService } from '@nestjs/jwt'

describe('Get Account (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[GET] /accounts/:id', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'test',
        email: 'test@example.com',
        password: '123456',
        has_permission: false,
        is_admin: false,
      },
    })

    const accessToken = jwt.sign({ sub: user.id })

    const response = await request(app.getHttpServer())
      .get(`/accounts/${user.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body.account.name).toEqual('test')
  })
})
