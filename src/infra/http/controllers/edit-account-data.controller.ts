import {
  Body,
  Controller,
  HttpCode,
  NotFoundException,
  Param,
  Put,
} from '@nestjs/common'
import { PrismaService } from '@/infra/prisma/prisma.service'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import {
  EditAccountBodySchema,
  editAccountBodySchema,
} from '@/infra/http/schemas/edit-account-body-schema'
import { GetDataById } from '@/infra/http/schemas/get-data-by-id-schema'

const bodyValidationPipe = new ZodValidationPipe(editAccountBodySchema)

@Controller('/accounts/:id')
export class EditAccountDataController {
  constructor(private prisma: PrismaService) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Param('id') id: GetDataById,
    @Body(bodyValidationPipe) body: EditAccountBodySchema,
  ) {
    const bodyWithoutSomeFields: EditAccountBodySchema = {
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
