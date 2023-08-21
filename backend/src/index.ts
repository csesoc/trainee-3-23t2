import getLogger from "src/utils/logger";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import errorHandler from "middleware-http-errors";
import { loginUser, logoutUser, registerUser } from "./functions/auth";
import { validateRequest, verifyToken } from "./utils/middleware";
import { UserLoginSchema, UserRegisterSchema } from "./schema/user.schema";

const logger = getLogger();
const app = express();

app.use(cors());
app.use(express.json());

// HEALTH CHECK
app.get("/", (req: Request, res: Response) => {
  logger.info("Health check");
  return res.status(200).json({
    message: "This server is healthy :D",
  });
});

// AUTH
app.post(
  "/auth/register",
  validateRequest(UserRegisterSchema, "body"),
  async (req: Request, res: Response, next: NextFunction) => {
    logger.info("Responding to /auth/register");
    try {
      const { username, email, password } = req.body;
      const result = await registerUser(username, email, password);
      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
);

app.post(
  "/auth/login",
  validateRequest(UserLoginSchema, "body"),
  async (req: Request, res: Response, next: NextFunction) => {
    logger.info("Responding to /auth/login");
    try {
      const { username, password } = req.body;
      const result = await loginUser(username, password);
      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
);

app.delete(
  "/auth/logout",
  verifyToken,
  async (req: Request, res: Response, next: NextFunction) => {
    logger.info("Responding to /auth/logout");
    try {
      const token = req.headers["authorization"]?.split(" ")[1];
      const result = await logoutUser(token as string);
      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
);

app.use(errorHandler());

// SERVER
app.listen(3030, () => {
  logger.info("Server starting");
});
