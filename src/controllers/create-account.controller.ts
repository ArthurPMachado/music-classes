import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import {
  CreateAccountSchema,
  createAccountSchema,
} from '@/schemas/create-account-schema'
import { hash } from 'bcryptjs'
import { ZodValidationPipe } from '@/pipes/zod-validation-pipe'

@Controller('/accounts')
export class CreateAccountController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAccountSchema))
  async handle(@Body() body: CreateAccountSchema) {
    const { name, email, password } = body

    const userWithSameEmail = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userWithSameEmail) {
      throw new ConflictException(
        'User with same e-mail address already exists.',
      )
    }

    const hashedPassword = await hash(password, 10)

    await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        has_permission: false,
        is_admin: false,
      },
    })
  }
}
