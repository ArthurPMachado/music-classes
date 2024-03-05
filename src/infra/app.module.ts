import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaService } from './prisma/prisma.service'
import { envSchema } from './env/env'
import { AuthModule } from './auth/auth.module'
import { AuthenticateController } from './http/controllers/authenticate.controller'
import { CreateAccountController } from './http/controllers/create-account.controller'
import { FetchAccountsController } from './http/controllers/fetch-accounts.controller'
import { GetAccountController } from './http/controllers/get-account.controller'
import { GetUsersMetricsController } from './http/controllers/get-users-metrics.controller'
import { EditAccountPermissionController } from './http/controllers/edit-account-permission.controller'
import { DeleteAccountController } from './http/controllers/delete-account.controller'
import { EditAccountDataController } from './http/controllers/edit-account-data.controller'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [
    AuthenticateController,
    CreateAccountController,
    FetchAccountsController,
    GetAccountController,
    GetUsersMetricsController,
    EditAccountPermissionController,
    DeleteAccountController,
    EditAccountDataController,
  ],
  providers: [PrismaService],
})
export class AppModule {}
