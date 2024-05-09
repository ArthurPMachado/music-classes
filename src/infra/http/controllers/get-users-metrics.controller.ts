import { Controller, ForbiddenException, Get } from '@nestjs/common'
import { GetUsersMetricsUseCase } from '@/domain/application/use-cases/get-users-metrics'
import { CurrentUser } from '@/infra/auth/current-user.decorator'
import { TokenPayload } from '../schemas/token-schema'
import { ValidateUserRole } from '../utils/validate-user-role'

@Controller('/users/metrics')
export class GetUsersMetricsController {
  constructor(private getUsersMetrics: GetUsersMetricsUseCase) {}

  @Get()
  async handle(@CurrentUser() user: TokenPayload) {
    const isAdmin = ValidateUserRole.isAdmin(user.role)

    if (!isAdmin) {
      throw new ForbiddenException('Only admins can get metrics')
    }

    const result = await this.getUsersMetrics.execute()

    return {
      users: result.value,
    }
  }
}
