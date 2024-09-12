import { Public } from '@/infra/auth/public'
import { Controller, Get } from '@nestjs/common'

@Controller('/health')
@Public()
export class HealthController {
  @Get()
  async handle() {
    const healthCheck = {
      status: 200,
      message: 'OK',
    }

    return healthCheck
  }
}
