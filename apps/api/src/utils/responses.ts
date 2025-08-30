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
