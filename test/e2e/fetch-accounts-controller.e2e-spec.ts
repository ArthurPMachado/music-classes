import request from 'supertest'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { PrismaService } from '@/prisma/prisma.service'
import { AppModule } from '@/app.module'
import { JwtService } from '@nestjs/jwt'

describe('Fetch Accounts (E2E)', () => {
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

  test('[GET] /accounts', async () => {
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

    await prisma.user.createMany({
      data: [
        {
          name: 'test2',
          email: 'test2@example.com',
          password: '123456',
          has_permission: false,
          is_admin: false,
        },
        {
          name: 'test3',
          email: 'test3@example.com',
          password: '123456',
          has_permission: false,
          is_admin: false,
        },
      ],
    })

    const response = await request(app.getHttpServer())
      .get('/accounts')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    console.log(response.body)

    expect(response.statusCode).toBe(200)
    expect(response.body.accounts.length).toEqual(3)
  })
})
