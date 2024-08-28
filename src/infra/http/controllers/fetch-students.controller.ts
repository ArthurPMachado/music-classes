import {
  BadRequestException,
  Controller,
  ForbiddenException,
  Get,
  Query,
} from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import {
  pageQueryParamSchema,
  PageQueryParamSchema,
} from '@/infra/http/schemas/page-query-param-schema'
import { FetchStudentsUseCase } from '@/domain/application/use-cases/fetch-students'
import { CurrentUser } from '@/infra/auth/current-user.decorator'
import { TokenPayload } from '../schemas/token-schema'
import { ValidateUserRole } from '../utils/validate-user-role'

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

@Controller('/students')
export class FetchStudentsController {
  constructor(private fetchStudents: FetchStudentsUseCase) {}

  @Get()
  async handle(
    @Query('page', queryValidationPipe) page: PageQueryParamSchema,
    @CurrentUser() user: TokenPayload,
  ) {
    const isAdmin = ValidateUserRole.isAdmin(user.role)

    if (!isAdmin) {
      throw new ForbiddenException('Only admins can fetch students')
    }

    const result = await this.fetchStudents.execute({
      page,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const { studentsResponse } = result.value

    return {
      studentsResponse,
    }
  }
}
