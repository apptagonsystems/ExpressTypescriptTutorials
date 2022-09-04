import { Request, Response, NextFunction } from "express";
import { Users } from "../models/User";
import { verifyToken } from "../utils/jwt";
import { AppError } from "./error.middleware";

export const userAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const header = req.headers.authorization;

    if (!header || header?.startsWith("Bearer ")) {
      next(new AppError(401, "User is not authorized"));
    }

    const token = header?.split(" ")[1];
    const payload: any = verifyToken(token);
    const user = await Users.findOne({ _id: payload?.userID });

    if (!user) {
      next(new AppError(401, "User is not authorized"));
    }

    req.user = user;

    next();
  } catch (error) {
    next(new AppError(401, "User is not authorized"));
  }
};
