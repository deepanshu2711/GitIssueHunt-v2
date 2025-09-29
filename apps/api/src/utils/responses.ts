import type { Response } from "express";

export const successResponse = (
  res: Response,
  data: any,
  message = "Request successful",
  statusCode = 200,
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const errorResponse = (
  res: Response,
  errors: any,
  message = "Something went wrong",
  statusCode = 500,
) => {
  return res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
};

export type AsyncRouteHandler = (...args: any[]) => Promise<any> | any;

export const asyncHandler = (fn: AsyncRouteHandler) => {
  return async function asyncHandled(...args: any[]) {
    const next = args[2];
    try {
      return await fn(...args);
    } catch (error) {
      return next(error);
    }
  };
};

export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode = 500, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
  }
}

export const notFound = (req: any, res: Response) => {
  return errorResponse(res, null, `Not Found - ${req.originalUrl}`, 404);
};

export const errorHandler = (err: any, req: any, res: Response, next: any) => {
  const statusCode = err?.statusCode || 500;
  const message = err?.message || "Something went wrong";
  const errors =
    process.env.NODE_ENV === "production"
      ? undefined
      : {
          name: err?.name,
          stack: err?.stack,
        };
  return errorResponse(res, errors, message, statusCode);
};
