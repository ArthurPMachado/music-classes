import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  NotFoundException,
  Put,
} from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import {
  editStudentBodySchema,
  EditStudentBodySchema,
} from '../schemas/edit-student-body-schema'
import { EditStudentUseCase } from '@/domain/application/use-cases/edit-student'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { CurrentUser } from '@/infra/auth/current-user.decorator'
import { TokenPayload } from '../schemas/token-schema'

const bodyValidationPipe = new ZodValidationPipe(editStudentBodySchema)

@Controller('/students')
export class EditStudentController {
  constructor(private editStudent: EditStudentUseCase) {}

  @Put('/data')
  @HttpCode(204)
  async handle(
    @CurrentUser() user: TokenPayload,
    @Body(bodyValidationPipe) body: EditStudentBodySchema,
  ) {
    const { name, email, phone, age } = body
    const { sub: studentId } = user

    const result = await this.editStudent.execute({
      studentId,
      name,
      email,
      phone,
      age,
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
