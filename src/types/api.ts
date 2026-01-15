// Generic API types

export interface ApiError {
  status: number
  message: string
}

export class ApiErrorClass extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}
