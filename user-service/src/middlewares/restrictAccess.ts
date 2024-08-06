import { Request, Response, NextFunction } from "express";

const ALLOWED_ORIGIN = "http://localhost:5000"; // Gateway URL

const restrictAccess = (req: Request, res: Response, next: NextFunction) => {
  const origin = req.get("origin") || req.get("referer");

  if (origin === ALLOWED_ORIGIN) {
    next();
  } else {
    res.status(403).json({ message: "Access forbidden" });
  }
};

export default restrictAccess;
