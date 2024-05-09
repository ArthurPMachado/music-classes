export class ValidateUserRole {
  static isAdmin(userRole: string): boolean {
    return userRole === 'ADMIN'
  }
}
