import { Request, Response, NextFunction } from "express";

interface ResponseFormat {
  success: boolean;
  data?: any;
  message?: string;
  error?: any;
}

export const formatResponse = (
  success: boolean,
  data: any = null,
  message: string = "",
  error: any = null
): ResponseFormat => {
  return {
    success,
    data,
    message,
    error,
  };
};

declare global {
  namespace Express {
    interface Response {
      sendFormatted: (data: any, message?: string) => void;
      sendError: (error: any, message?: string, status?: number) => void;
    }
  }
}

export const responseFormatter = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.sendFormatted = (data: any, message: string = "") => {
    res.json(formatResponse(true, data, message));
  };

  res.sendError = (error: any, message: string = "", status: number = 500) => {
    res.status(status).json(formatResponse(false, null, message, error));
  };

  next();
};
