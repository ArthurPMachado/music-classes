import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import {
  IMailRepository,
  ISendMailProps,
} from '@/domain/application/repositories/mail-repository'
import Handlebars from 'handlebars'

@Injectable()
export class MailService implements IMailRepository {
  constructor(private mailerService: MailerService) {}

  async sendMail(sendEmailProps: ISendMailProps): Promise<void> {
    const { name, email, templateContent, url } = sendEmailProps

    const templateParse = Handlebars.compile(templateContent)

    const templateHTML = templateParse({ name, url })

    await this.mailerService.sendMail({
      from: 'development@sandbox14e8321097594c93b66c9f8415bc0d24.mailgun.org',
      to: email,
      subject: 'Recuperação de senha',
      html: templateHTML,
      context: {
        name,
        url,
      },
    })
  }
}
