import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const header = req.headers.authorization;
    const token = header?.split(" ")[1];
    if (!token) {
      res.status(301).json({
        success: false,
        messsage: "jwt token in not present ",
      });
      return;
    }

    const isToken = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    if (!isToken) {
      res.status(401).json({
        success: false,
        messsage: "Provide valid token ",
      });
      return;
    }
    req.userId = isToken.userId;
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      messsage: "Internal server error",
    });
  }
};

export default userMiddleware;
