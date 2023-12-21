import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaService } from './prisma/prisma.service'
import { envSchema } from './env'
import { AuthModule } from './auth/auth.module'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateAccountController } from './controllers/create-account.controller'
import { FetchAccountsController } from './controllers/fetch-accounts.controller'
import { GetAccountController } from './controllers/get-account.controller'
import { GetUsersMetricsController } from './controllers/get-users-metrics.controller'
import { ChangeAccountPermissionController } from './controllers/change-account-permission.controller'
import { DeleteAccountController } from './controllers/delete-account.controller'

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
    ChangeAccountPermissionController,
    DeleteAccountController,
  ],
  providers: [PrismaService],
})
export class AppModule {}
