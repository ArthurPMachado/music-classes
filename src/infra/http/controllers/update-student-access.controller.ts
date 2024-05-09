import {
  BadRequestException,
  Controller,
  ForbiddenException,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
} from '@nestjs/common'
import { GetDataById } from '@/infra/http/schemas/get-data-by-id-schema'
import { UpdateStudentAccessUseCase } from '@/domain/application/use-cases/update-student-access'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { CurrentUser } from '@/infra/auth/current-user.decorator'
import { TokenPayload } from '../schemas/token-schema'
import { ValidateUserRole } from '../utils/validate-user-role'

@Controller('/students/:id')
export class UpdateStudentAccessController {
  constructor(private updateStudentAccess: UpdateStudentAccessUseCase) {}

  @Patch('/permissions/:status')
  @HttpCode(204)
  async handle(
    @Param('id') studentId: GetDataById,
    @Param('status') status: boolean,
    @CurrentUser() user: TokenPayload,
  ) {
    const isAdmin = ValidateUserRole.isAdmin(user.role)

    if (!isAdmin) {
      throw new ForbiddenException('Only admins can update a student access')
    }

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
