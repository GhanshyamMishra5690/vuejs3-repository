export type User = {
  id: number
  name: string
  email: string
  password: string
  role: string
  avatar: string
  creationAt: string
}

export type FormData = {
  name: string
  email: string
  password: string
  role: string
  avatar: string
}

export interface APIResponse<T> {
  statusCode: string
  error: string
  message: T
}
