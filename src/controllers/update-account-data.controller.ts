import {
  Body,
  Controller,
  HttpCode,
  NotFoundException,
  Param,
  Put,
} from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { ZodValidationPipe } from '@/pipes/zod-validation-pipe'
import {
  UpdateAccountBodySchema,
  updateAccountBodySchema,
} from '@/schemas/update-account-body-schema'
import { GetDataById } from '@/schemas/get-data-by-id-schema'

const bodyValidationPipe = new ZodValidationPipe(updateAccountBodySchema)

@Controller('/accounts/:id')
export class UpdateAccountDataController {
  constructor(private prisma: PrismaService) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Param('id') id: GetDataById,
    @Body(bodyValidationPipe) body: UpdateAccountBodySchema,
  ) {
    const bodyWithoutSomeFields: UpdateAccountBodySchema = {
      name: body.name,
      email: body.email,
      age: body.age,
      phone: body.phone,
    }

    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (!user) {
      throw new NotFoundException('User does not exist')
    }

    await this.prisma.user.update({
      where: {
        id,
      },
      data: bodyWithoutSomeFields,
    })
  }
}
