import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { ZodValidationPipe } from '@/pipes/zod-validation-pipe'
import { PrismaService } from '@/prisma/prisma.service'
import {
  pageQueryParamSchema,
  PageQueryParamSchema,
} from '@/schemas/page-query-param-schema'
import { Controller, Get, Query, UseGuards, UsePipes } from '@nestjs/common'

@Controller('/accounts')
@UseGuards(JwtAuthGuard)
export class FetchAccountsController {
  constructor(private prisma: PrismaService) {}

  @Get()
  @UsePipes(new ZodValidationPipe(pageQueryParamSchema))
  async handle(@Query('page') page: PageQueryParamSchema) {
    const perPage = 20

    const accounts = await this.prisma.user.findMany({
      take: perPage,
      skip: (page - 1) * perPage,
    })

    return {
      accounts,
    }
  }
}
