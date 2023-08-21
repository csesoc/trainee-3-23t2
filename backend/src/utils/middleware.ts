import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";
import getLogger from "./logger";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import getHash from "./hash";

const logger = getLogger();
const prisma = new PrismaClient();

export const validateRequest = (
  schema: ZodSchema,
  property: "body" | "query"
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[property]);
    if (!result.success) {
      logger.info("Invalid request was made");
      return res.status(400).json({
        error: "Invalid request was made",
        data: req[property],
      });
    }
    next();
  };
};

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const secret = process.env.JWT_SECRET as string;
  const { authorization: token, userid } = req.headers;

  if (!token || !(token as string).startsWith("Bearer") || !userid) {
    return res.status(401).json({
      error: "Unauthorised",
    });
  }

  const cleanedToken = token.split(" ")[1];
  try {
    jwt.verify(cleanedToken as string, secret);
    const tokenExists = await prisma.token.findFirst({
      where: {
        token: getHash(cleanedToken as string),
      },
    });
    if (!tokenExists || tokenExists.userId !== userid) {
      return res.status(401).json({ message: "Invalid Token" });
    }
  } catch (err: any) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Expired token" });
    }
    return res.status(401).json({ message: "Invalid Token" });
  }
  next();
};
