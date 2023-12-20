import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { PrismaService } from '@/prisma/prisma.service'
import { Controller, Get, UseGuards } from '@nestjs/common'

@Controller('/metrics')
@UseGuards(JwtAuthGuard)
export class GetUsersMetricsController {
  constructor(private prisma: PrismaService) {}

  @Get('')
  async handle() {
    const numberOfUsers = await this.prisma.user.count()
    const numberOfUsersThatHavePermissions = await this.prisma.user.count({
      where: {
        has_permission: true,
      },
    })

    const metrics = {
      number_of_users: numberOfUsers,
      number_of_users_that_have_permissions: numberOfUsersThatHavePermissions,
    }

    return {
      metrics,
    }
  }
}
