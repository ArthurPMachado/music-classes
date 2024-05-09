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

@Module({
  controllers: [
    AuthenticateController,
    CreateStudentController,
    FetchStudentsController,
    GetUsersMetricsController,
    EditStudentController,
    UpdateStudentAccessController,
    DeleteStudentController,
  ],
  providers: [
    AuthenticateUseCase,
    CreateStudentUseCase,
    FetchStudentsUseCase,
    GetUsersMetricsUseCase,
    EditStudentUseCase,
    UpdateStudentAccessUseCase,
    DeleteStudentUseCase,
  ],
})
export class HttpModule {}
