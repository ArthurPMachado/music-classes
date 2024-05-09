import {
  BadRequestException,
  Controller,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
} from '@nestjs/common'
import { GetDataById } from '@/infra/http/schemas/get-data-by-id-schema'
import { UpdateStudentAccessUseCase } from '@/domain/application/use-cases/update-student-access'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

@Controller('/students/:id')
export class UpdateStudentAccessController {
  constructor(private updateStudentAccess: UpdateStudentAccessUseCase) {}

  @Patch('/permissions/:status')
  @HttpCode(204)
  async handle(
    @Param('id') studentId: GetDataById,
    @Param('status') status: boolean,
  ) {
    const result = await this.updateStudentAccess.execute({
      studentId,
      hasAccess: status,
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
