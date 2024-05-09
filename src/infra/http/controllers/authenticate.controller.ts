import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnauthorizedException,
} from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import {
  authenticateBodySchema,
  AuthenticateBodySchema,
} from '@/infra/http/schemas/authenticate-body-schema'
import { AuthenticateUseCase } from '@/domain/application/use-cases/authenticate'
import { WrongCredentialsError } from '@/domain/application/use-cases/errors/wrong-credentials-error'
import { Public } from '@/infra/auth/public'

const bodyValidationPipe = new ZodValidationPipe(authenticateBodySchema)

@Controller('/sessions')
@Public()
export class AuthenticateController {
  constructor(private authenticate: AuthenticateUseCase) {}

  @Post()
  async handle(@Body(bodyValidationPipe) body: AuthenticateBodySchema) {
    const { email, password } = body

    const result = await this.authenticate.execute({
      email,
      password,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case WrongCredentialsError:
          throw new UnauthorizedException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    const { accessToken } = result.value

    return {
      access_token: accessToken,
    }
  }
}
