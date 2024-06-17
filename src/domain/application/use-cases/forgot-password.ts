import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { Injectable } from '@nestjs/common'
import {
  IForgotPasswordUseCaseRequest,
  IForgotPasswordUseCaseResponse,
} from './interfaces/IForgotPasswordUseCase'
import { IUsersRepository } from '../repositories/users-repository'
import { IMailRepository } from '../repositories/mail-repository'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { left } from '@/core/either'
import { ForgotPasswordMailNotSentError } from './errors/forgot-password-mail-not-sent-error'
import { JwtService } from '@nestjs/jwt'
import { EnvService } from '@/infra/env/env.service'

@Injectable()
export class ForgotPassword {
  constructor(
    private usersRepository: IUsersRepository,
    private mailRepository: IMailRepository,
    private jwtService: JwtService,
    private envService: EnvService,
  ) {}

  async execute({
    email,
  }: IForgotPasswordUseCaseRequest): Promise<IForgotPasswordUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    const templatePath = resolve(
      __dirname,
      '..',
      'templates',
      'email',
      'forgotPassword.hbs',
    )

    const templateContent = readFileSync(templatePath).toString('utf-8')

    const payload = { email: user.email }
    const token = this.jwtService.sign(payload)

    const baseUrl = this.envService.get('BASE_URL')
    const resetPath = this.envService.get('RESET_PATH')

    const sendEmailProps = {
      email,
      templateContent,
      url: `${baseUrl}${resetPath}?token=${token}`,
    }

    try {
      await this.mailRepository.sendMail(sendEmailProps)
    } catch (error) {
      return left(new ForgotPasswordMailNotSentError())
    }
  }
}
