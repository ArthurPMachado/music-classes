import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { ZodValidationPipe } from '@/pipes/zod-validation-pipe'
import { PrismaService } from '@/prisma/prisma.service'
import { GetDataById, getDataById } from '@/schemas/get-data-by-id-schema'
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
