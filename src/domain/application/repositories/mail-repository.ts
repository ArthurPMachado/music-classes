interface ISendMailProps {
  email: string
  templateContent: string
  url: string
}

export abstract class IMailRepository {
  abstract sendMail(sendEmailProps: ISendMailProps): Promise<void>
}
