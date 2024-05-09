import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  NotFoundException,
  Param,
  Put,
} from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import {
  editStudentBodySchema,
  EditStudentBodySchema,
} from '../schemas/edit-student-body-schema'
import { GetDataById } from '@/infra/http/schemas/get-data-by-id-schema'
import { EditStudentUseCase } from '@/domain/application/use-cases/edit-student'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

const bodyValidationPipe = new ZodValidationPipe(editStudentBodySchema)

@Controller('/students')
export class EditStudentController {
  constructor(private editStudent: EditStudentUseCase) {}

  @Put(':id')
  @HttpCode(204)
  async handle(
    @Param('id') studentId: GetDataById,
    @Body(bodyValidationPipe) body: EditStudentBodySchema,
  ) {
    const { name, email, phone, age } = body

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
