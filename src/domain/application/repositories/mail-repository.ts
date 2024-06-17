export abstract class IMailRepository {
  abstract sendMail(
    email: string,
    templatePath: string,
    token?: string,
  ): Promise<void>
}
