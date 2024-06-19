import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  NotFoundException,
  Post,
} from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import {
  ForgotPasswordBodySchema,
  forgotPasswordBodySchema,
} from '../schemas/forgot-password-schema'
import { Public } from '@/infra/auth/public'
import { ForgotPasswordUseCase } from '@/domain/application/use-cases/forgot-password'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

const bodyValidationPipe = new ZodValidationPipe(forgotPasswordBodySchema)

@Controller('/students/forgot-password')
@Public()
export class ForgotPasswordController {
  constructor(private forgotPassword: ForgotPasswordUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(@Body(bodyValidationPipe) body: ForgotPasswordBodySchema) {
    const { email } = body

    const result = await this.forgotPassword.execute({
      email,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
