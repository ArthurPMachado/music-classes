import { Injectable } from '@nestjs/common'
import { IUsersRepository } from '../repositories/users-repository'
import { IGetUsersMetricsUseCaseResponse } from './interfaces/IGetUsersMetricsUseCaseResponse'
import { right } from '@/core/either'

@Injectable()
export class GetUsersMetricsUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(): Promise<IGetUsersMetricsUseCaseResponse> {
    const totalUsers = await this.usersRepository.getTotalUsers()

    const totalUsersWithAccess = totalUsers.filter(
      (user) => user.hasAccess,
    ).length

    return right({
      totalUsers: totalUsers.length,
      totalUsersWithAccess,
    })
  }
}
