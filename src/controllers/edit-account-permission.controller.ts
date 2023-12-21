import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { ZodValidationPipe } from '@/pipes/zod-validation-pipe'
import { PrismaService } from '@/prisma/prisma.service'
import {
  EditAccountPermissionSchema,
  editAccountPermissionSchema,
} from '@/schemas/edit-account-permission-schema'
import { GetDataById } from '@/schemas/get-data-by-id-schema'
import {
  Controller,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common'

const statusValidationPipe = new ZodValidationPipe(editAccountPermissionSchema)

@Controller('/accounts/:id')
@UseGuards(JwtAuthGuard)
export class EditAccountPermissionController {
  constructor(private prisma: PrismaService) {}

  @Patch('/permissions/:status')
  @HttpCode(204)
  async handle(
    @Param('id') id: GetDataById,
    @Param(statusValidationPipe) status: EditAccountPermissionSchema,
  ) {
    // convert string to boolean and maintain it's value
    const parsedStatus = JSON.parse(status.status)

    try {
      await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          has_permission: parsedStatus,
        },
      })
    } catch (error) {
      throw new NotFoundException('User does not exists')
    }
  }
}
