import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { PrismaService } from '@/infra/prisma/prisma.service'
import {
  GetDataById,
  getDataById,
} from '@/infra/http/schemas/get-data-by-id-schema'
import {
  Controller,
  Delete,
  HttpCode,
  NotFoundException,
  Param,
  UseGuards,
  UsePipes,
} from '@nestjs/common'

@Controller('/accounts')
@UseGuards(JwtAuthGuard)
export class DeleteAccountController {
  constructor(private prisma: PrismaService) {}

  @Delete(':id')
  @HttpCode(204)
  @UsePipes(new ZodValidationPipe(getDataById))
  async handle(@Param('id') id: GetDataById) {
    try {
      await this.prisma.user.delete({
        where: {
          id,
        },
      })
    } catch (error) {
      throw new NotFoundException('User does not exist')
    }
  }
}
