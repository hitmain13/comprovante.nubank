import { errorNameByStatus } from './error-name-by-status'

export class ApiErrorFactory {
  public static create(message: string, status: number) {
    return new ApiError(message, status)
  }
}

class ApiError extends Error {
  public status: number

  constructor(message: string, status: number) {
    super(message)
    this.status = status

    const errorName = errorNameByStatus[status] || 'ApiError'
    this.name = errorName

    Object.setPrototypeOf(this, new.target.prototype)
  }
}
