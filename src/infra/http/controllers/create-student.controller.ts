import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common'
import {
  CreateAccountSchema,
  createAccountSchema,
} from '@/infra/http/schemas/create-account-schema'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { Public } from '@/infra/auth/public'
import { CreateStudentUseCase } from '@/domain/application/use-cases/create-student'
import { StudentAlreadyExistsError } from '@/domain/application/use-cases/errors/student-already-exists-error'

const bodyValidationPipe = new ZodValidationPipe(createAccountSchema)

@Controller('/accounts')
@Public()
export class CreateAccountController {
  constructor(private createStudent: CreateStudentUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(@Body(bodyValidationPipe) body: CreateAccountSchema) {
    const { name, email, password } = body

    const result = await this.createStudent.execute({
      name,
      email,
      password,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case StudentAlreadyExistsError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
