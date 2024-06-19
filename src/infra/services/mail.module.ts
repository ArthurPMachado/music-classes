import { MailerModule } from '@nestjs-modules/mailer'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Env } from '../env/env'
import { MailService } from './mail.service'
import { IMailRepository } from '@/domain/application/repositories/mail-repository'
import { EnvService } from '../env/env.service'

@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService<Env, true>) => ({
        transport: {
          host: config.get('SMTP_HOST', { infer: true }),
          port: config.get('SMTP_PORT', { infer: true }),
          ignoreTLS: true,
          secure: false,
          auth: {
            user: config.get('SMTP_USERNAME', { infer: true }),
            pass: config.get('SMTP_PASSWORD', { infer: true }),
          },
        },
      }),
    }),
  ],
  providers: [
    EnvService,
    {
      provide: IMailRepository,
      useClass: MailService,
    },
  ],
  exports: [IMailRepository],
})
export class MailModule {}
