import { Request, Response, NextFunction } from "express";
import { logError } from "../utils/errorLogger";

class ProductMiddleware {
  constructor() {}
  public validateCreateProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { name, description, price, userId } = req.body;
      if (!name || !description || !price || !userId) {
        res.sendError(
          "ValidationError: Name, description, price, and userId are required",
          "Missing required fields: name, description, price, and userId",
          400
        );
        return;
      }
      next();
    } catch (error: any) {
      logError(error, req, "Middleware-validateCreateProduct");
      res.sendError(error.message, "An unexpected error occurred", 500);
    }
  }

  public validateUpdateProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { name, description, price } = req.body;
      if (!name && !description && !price) {
        res.sendError(
          "ValidationError: Name, description, or price must be provided",
          "Name, description, or price must be provided",
          400
        );
        return;
      }
      next();
    } catch (error: any) {
      logError(error, req, "Middleware-validateUpdateProduct");
      res.sendError(error.message, "An unexpected error occurred", 500);
    }
  }

  public validateProductId(req: Request, res: Response, next: NextFunction) {
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
      logError(error, req, "Middleware-validateProductId");
      res.sendError(error.message, "An unexpected error occurred", 500);
    }
  }

  public validateUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      if (!userId) {
        res.sendError(
          "ValidationError: userId must be provided",
          "userId must be provided",
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

export default ProductMiddleware;
