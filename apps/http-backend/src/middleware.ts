import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as backendCommon from "@repo/backend-common";
const { JWT_SECRET } = backendCommon;


export function middleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers["authorization"] ?? "";

  const decoded = jwt.verify(token, JWT_SECRET);

  if (decoded) {
    //@ts-ignore TODO: fix this
    req.userId = decoded.userId;
    next();
  } else {
    res.status(403).json({
      message: "Unauthorized",
    });
  }
}
