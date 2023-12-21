import request from 'supertest'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { PrismaService } from '@/prisma/prisma.service'
import { AppModule } from '@/app.module'
import { JwtService } from '@nestjs/jwt'

describe('Edit account permission (E2E)', () => {
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

  test('[PATCH] /accounts/:id/permissions/:status', async () => {
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

    expect(user.has_permission).toBeFalsy()

    const response = await request(app.getHttpServer())
      .patch(`/accounts/${user.id}/permissions/true`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(204)

    const updatedUser = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    })

    expect(updatedUser.has_permission).toBeTruthy()
  })
})
