import { GetUsersMetricsUseCase } from '@/domain/application/use-cases/get-users-metrics'
import { Controller, Get } from '@nestjs/common'

@Controller('users/metrics')
export class GetUsersMetricsController {
  constructor(private getUsersMetrics: GetUsersMetricsUseCase) {}

  @Get()
  async handle() {
    const result = await this.getUsersMetrics.execute()

    return {
      users: result.value,
    }
  }
}
