import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  NotFoundException,
  Param,
} from '@nestjs/common'
import { GetDataById } from '@/infra/http/schemas/get-data-by-id-schema'
import { DeleteStudentUseCase } from '@/domain/application/use-cases/delete-student'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

@Controller('/students')
export class DeleteStudentController {
  constructor(private deleteStudent: DeleteStudentUseCase) {}

  @Delete(':id')
  @HttpCode(204)
  async handle(@Param('id') studentId: GetDataById) {
    const result = await this.deleteStudent.execute({ studentId })

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
