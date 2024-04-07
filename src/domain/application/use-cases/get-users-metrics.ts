import { IUsersRepository } from '../repositories/users-repository'
import { IUsersMetricsResponse } from './interfaces/IUserMetricsResponse'

export class GetUsersMetrics {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(): Promise<IUsersMetricsResponse> {
    const totalUsers = await this.usersRepository.getTotalUsers()

    const totalUsersWithAccess = totalUsers.filter(
      (user) => user.hasAccess,
    ).length

    return {
      totalUsers: totalUsers.length,
      totalUsersWithAccess,
    }
  }
}
