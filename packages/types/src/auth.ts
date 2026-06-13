export type UserRole =
  | 'super-admin'
  | 'admin'
  | 'editor'
  | 'viewer'

export interface IUser {
  id: string
  email: string
  firstName: string
  lastName?: string
  role: UserRole
}
