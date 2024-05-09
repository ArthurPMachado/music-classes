import {
  BadRequestException,
  Controller,
  Delete,
  ForbiddenException,
  HttpCode,
  NotFoundException,
  Param,
} from '@nestjs/common'
import { GetDataById } from '@/infra/http/schemas/get-data-by-id-schema'
import { DeleteStudentUseCase } from '@/domain/application/use-cases/delete-student'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { CurrentUser } from '@/infra/auth/current-user.decorator'
import { TokenPayload } from '../schemas/token-schema'
import { ValidateUserRole } from '../utils/validate-user-role'

@Controller('/students')
export class DeleteStudentController {
  constructor(private deleteStudent: DeleteStudentUseCase) {}

  @Delete(':id')
  @HttpCode(204)
  async handle(
    @Param('id') studentId: GetDataById,
    @CurrentUser() user: TokenPayload,
  ) {
    const isAdmin = ValidateUserRole.isAdmin(user.role)

    if (!isAdmin) {
      throw new ForbiddenException('Only admins can delete students')
    }

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
