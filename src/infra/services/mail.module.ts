import { MailerModule } from '@nestjs-modules/mailer'
import { Module } from '@nestjs/common'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { ConfigService } from '@nestjs/config'
import { Env } from '../env/env'

@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService<Env, true>) => ({
        transport: {
          host: config.get('SMTP_HOST', { infer: true }),
          port: config.get('PORT', { infer: true }),
          ignoreTLS: true,
          secure: false,
          auth: {
            user: config.get('SMTP_USERNAME', { infer: true }),
            pass: config.get('SMTP_PASSWORD', { infer: true }),
          },
        },
        defaults: {
          from: config.get('SMTP_USERNAME', { infer: true }),
        },
        template: {
          dir: process.cwd() + '/src/infra/templates/email',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
})
export class MailModule {}
