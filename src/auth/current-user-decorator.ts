import { TokenPayload } from '@/schemas/token-schema'
import { ExecutionContext, createParamDecorator } from '@nestjs/common'

export const CurrentUser = createParamDecorator(
  (_: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest()

    return request.user as TokenPayload
  },
)
