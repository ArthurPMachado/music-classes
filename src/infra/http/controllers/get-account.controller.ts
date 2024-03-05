import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { PrismaService } from '@/infra/prisma/prisma.service'
import {
  GetDataById,
  getDataById,
} from '@/infra/http/schemas/get-data-by-id-schema'
import { Controller, Get, Param, UseGuards, UsePipes } from '@nestjs/common'

@Controller('/accounts')
@UseGuards(JwtAuthGuard)
export class GetAccountController {
  constructor(private prisma: PrismaService) {}

  @Get(':id')
  @UsePipes(new ZodValidationPipe(getDataById))
  async handle(@Param('id') id: GetDataById) {
    const account = await this.prisma.user.findUnique({
      where: {
        id,
      },
    })

    return {
      account,
    }
  }
}
