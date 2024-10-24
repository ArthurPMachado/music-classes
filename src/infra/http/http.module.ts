import { Module } from '@nestjs/common'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateStudentController } from './controllers/create-student.controller'
import { FetchStudentsController } from './controllers/fetch-students.controller'
import { EditStudentController } from './controllers/edit-student.controller'
import { UpdateStudentAccessController } from './controllers/update-student-access.controller'
import { GetUsersMetricsController } from './controllers/get-users-metrics.controller'
import { DeleteStudentController } from './controllers/delete-student.controller'
import { AuthenticateUseCase } from '@/domain/application/use-cases/authenticate'
import { CreateStudentUseCase } from '@/domain/application/use-cases/create-student'
import { FetchStudentsUseCase } from '@/domain/application/use-cases/fetch-students'
import { GetUsersMetricsUseCase } from '@/domain/application/use-cases/get-users-metrics'
import { EditStudentUseCase } from '@/domain/application/use-cases/edit-student'
import { UpdateStudentAccessUseCase } from '@/domain/application/use-cases/update-student-access'
import { DeleteStudentUseCase } from '@/domain/application/use-cases/delete-student'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { DatabaseModule } from '../database/prisma/database.module'
import { ForgotPasswordController } from './controllers/forgot-password.controller'
import { ForgotPasswordUseCase } from '@/domain/application/use-cases/forgot-password'
import { MailModule } from '../services/mail.module'
import { EnvService } from '../env/env.service'
import { HealthController } from './controllers/health.controller'
import { ResetPasswordController } from './controllers/reset-password.controller'
import { ResetPasswordUseCase } from '@/domain/application/use-cases/reset-password'

@Module({
  imports: [CryptographyModule, DatabaseModule, MailModule],
  controllers: [
    HealthController,
    AuthenticateController,
    CreateStudentController,
    FetchStudentsController,
    GetUsersMetricsController,
    EditStudentController,
    UpdateStudentAccessController,
    DeleteStudentController,
    ForgotPasswordController,
    ResetPasswordController,
  ],
  providers: [
    EnvService,
    AuthenticateUseCase,
    CreateStudentUseCase,
    FetchStudentsUseCase,
    GetUsersMetricsUseCase,
    EditStudentUseCase,
    UpdateStudentAccessUseCase,
    DeleteStudentUseCase,
    ForgotPasswordUseCase,
    ResetPasswordUseCase,
  ],
})
export class HttpModule {}
