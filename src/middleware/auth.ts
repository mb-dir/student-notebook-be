import { IUserDocument, UserModel } from "../models/User";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import { IncomingHttpHeaders } from "http";

declare module "express" {
  interface Request {
    user?: IUserDocument;
  }
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization }: IncomingHttpHeaders = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: "Auth token required" });
  }

  const token: string = authorization.split(" ")[1];

  try {
    const decodedToken: string | JwtPayload = jwt.verify(
      token,
      process.env.SECRET || ""
    );

    if (typeof decodedToken === "string") {
      throw new Error("Invalid token");
    }

    const { id }: JwtPayload = decodedToken;

    const user: IUserDocument | null = await UserModel.findOne({ id });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Request is not authorized" });
  }
};
