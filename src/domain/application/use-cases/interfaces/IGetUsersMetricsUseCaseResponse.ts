import { Either } from "@/core/either"

export type IGetUsersMetricsUseCaseResponse = Either<null, {
  totalUsers: number
  totalUsersWithAccess: number
}>

