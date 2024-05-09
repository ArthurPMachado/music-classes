import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import {
  pageQueryParamSchema,
  PageQueryParamSchema,
} from '@/infra/http/schemas/page-query-param-schema'
import { FetchStudentsUseCase } from '@/domain/application/use-cases/fetch-students'

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

@Controller('/students')
export class FetchStudentsController {
  constructor(private fetchStudents: FetchStudentsUseCase) {}

  @Get()
  async handle(@Query('page', queryValidationPipe) page: PageQueryParamSchema) {
    const result = await this.fetchStudents.execute({
      page,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const { students } = result.value

    return {
      students,
    }
  }
}
