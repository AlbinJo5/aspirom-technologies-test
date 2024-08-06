import { Request, Response, NextFunction } from "express";
import { logError } from "../utils/errorLogger";

class UserMiddleware {
  constructor() {}

  public validateCreateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email } = req.body;
      if (!name || !email) {
        res.sendError(
          "ValidationError: Name and email are required",
          "Missing required fields: name and email",
          400
        );
        return;
      }
      next();
    } catch (error: any) {
      logError(error, req, "Middleware-validateCreateUser");
      res.sendError(error.message, "An unexpected error occurred", 500);
    }
  }

  public validateUpdateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email } = req.body;
      if (!name && !email) {
        res.sendError(
          "ValidationError: Name,or email must be provided",
          "Name, Or email must be provided",
          400
        );
        return;
      }
      next();
    } catch (error: any) {
      logError(error, req, "Middleware-validateUpdateUser");
      res.sendError(error.message, "An unexpected error occurred", 500);
    }
  }

  public validateUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) {
        res.sendError(
          "ValidationError: ID must be provided",
          "ID must be provided",
          400
        );
        return;
      }
      next();
    } catch (error: any) {
      logError(error, req, "Middleware-validateUserId");
      res.sendError(error.message, "An unexpected error occurred", 500);
    }
  }
}

export default UserMiddleware;
