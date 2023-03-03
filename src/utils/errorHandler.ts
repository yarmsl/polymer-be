export const errorHandler = (error: unknown, message: string) => {
  if (error instanceof HttpError) return error;
  if (error instanceof Error) return { ...error, statusCode: 500 };
  return { message, statusCode: 500 };
};

export const unauthorizedError = (message = 'Unauthorized') => new HttpError(message, 401);

export const forbiddenError = (message = 'Forbidden') => new HttpError(message, 403);

export const notFoundError = (message = 'Not found') => new HttpError(message, 404);

export const existsError = (message = 'Already exists') => new HttpError(message, 409);

export class HttpError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}
