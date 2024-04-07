import { IMetricsResponse } from '@/core/repositories/metrics-response'
import { IUserProps } from '@/domain/enterprise/entities/interfaces/IUserProps'

export abstract class IUsersRepository {
  abstract findByEmail(email: string): Promise<IUserProps | null>
  abstract getMetrics(): Promise<IMetricsResponse>
}
