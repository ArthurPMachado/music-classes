import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { ZodValidationPipe } from '@/pipes/zod-validation-pipe'
import { PrismaService } from '@/prisma/prisma.service'
import {
  ChangeAccountPermissionSchema,
  changeAccountPermissionSchema,
} from '@/schemas/change-account-permission-schema'
import { GetDataById } from '@/schemas/get-data-by-id-schema'
import {
  BadRequestException,
  Controller,
  HttpCode,
  Param,
  Patch,
  UseGuards,
  UsePipes,
} from '@nestjs/common'

@Controller('/accounts')
@UseGuards(JwtAuthGuard)
export class ChangeAccountPermissionController {
  constructor(private prisma: PrismaService) {}

  @Patch(':id/permissions/:status')
  @HttpCode(204)
  @UsePipes(new ZodValidationPipe(changeAccountPermissionSchema))
  async handle(
    @Param('id') id: GetDataById,
    @Param('status') status: ChangeAccountPermissionSchema,
  ) {
    const regexPattern = /^(true|false|1|0)$/i

    console.log(status)

    const isOfTypeBoolean = regexPattern.test(status)

    if (!isOfTypeBoolean) {
      throw new BadRequestException('The status must be either true or false')
    }

    // convert string to boolean and maintain it's value
    const parsedStatus = JSON.parse(status)

    await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        has_permission: parsedStatus,
      },
    })
  }
}
