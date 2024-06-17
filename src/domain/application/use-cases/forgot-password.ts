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

@Injectable()
export class ForgotPassword {
  constructor(
    private usersRepository: IUsersRepository,
    private mailRepository: IMailRepository,
    private jwtService: JwtService,
  ) {}

  async execute({
    email,
  }: IForgotPasswordUseCaseRequest): Promise<IForgotPasswordUseCaseResponse> {
    const user = this.usersRepository.findByEmail(email)

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

    const templateFileContent = readFileSync(templatePath).toString('utf-8')

    const token = this.jwtService.sign({}, { expiresIn: '5m' })

    try {
      await this.mailRepository.sendMail(email, templateFileContent, token)
    } catch (error) {
      return left(new ForgotPasswordMailNotSentError())
    }
  }
}
