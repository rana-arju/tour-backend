export interface IUser {
  name: string
  age?: number
  email: string
  password?: string
  photo?: string | null
  role: 'user' | 'admin'
  userStatus: 'active' | 'inactive'
}
