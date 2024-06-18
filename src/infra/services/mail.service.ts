import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import {
  IMailRepository,
  ISendMailProps,
} from '@/domain/application/repositories/mail-repository'

@Injectable()
export class MailService implements IMailRepository {
  constructor(private mailerService: MailerService) {}

  async sendMail(sendEmailProps: ISendMailProps): Promise<void> {
    const { name, email, templateContent, url } = sendEmailProps

    await this.mailerService.sendMail({
      to: email,
      subject: 'Recuperação de senha',
      template: templateContent,
      context: {
        name,
        url,
      },
    })
  }
}
