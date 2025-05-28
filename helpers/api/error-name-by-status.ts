export const errorNameByStatus: Record<number, string> = {
  400: 'BadRequestError',
  401: 'UnauthorizedError',
  403: 'ForbiddenError',
  404: 'NotFoundError',
  500: 'InternalServerError',
}
