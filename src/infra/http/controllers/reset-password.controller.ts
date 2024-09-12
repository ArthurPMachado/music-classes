import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  NotFoundException,
  Post,
  Query,
  UnauthorizedException,
} from '@nestjs/common'
import { Public } from '@/infra/auth/public'
import { ResetPasswordUseCase } from '@/domain/application/use-cases/reset-password'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { SamePasswordError } from '@/domain/application/use-cases/errors/same-password-error'
import { TokenExpiredError } from '@/core/errors/token-expired-error'

@Controller('/students/reset-password')
@Public()
export class ResetPasswordController {
  constructor(private resetPasswordUseCase: ResetPasswordUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Query('token') token: string,
    @Body('password') password: string,
  ) {
    const result = await this.resetPasswordUseCase.execute({
      token,
      password,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case TokenExpiredError:
          throw new UnauthorizedException(error.message)
        case ResourceNotFoundError:
          throw new NotFoundException()
        case SamePasswordError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException()
      }
    }

    return result.value
  }
}
