import getLogger from "src/utils/logger";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import errorHandler from "middleware-http-errors";
import { loginUser, logoutUser, registerUser } from "./functions/auth";
import { validateRequest, verifyToken } from "./utils/middleware";
import { UserLoginSchema, UserRegisterSchema } from "./schema/user.schema";
import { AllPostsSchema, NewPostSchema } from "./schema/post.schema";
import { createNewPost, getAllPosts } from "./functions/post";
import { getAllThemes } from "./functions/theme";

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
  },
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
  },
);

app.post(
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
  },
);

// POSTS
app.get(
  "/posts",
  [verifyToken, validateRequest(AllPostsSchema, "query")],
  async (req: Request, res: Response, next: NextFunction) => {
    logger.info("Responding to /posts");
    try {
      const { id } = req.headers;
      const { offset } = req.query;
      const result = await getAllPosts(id as string, Number(offset));
      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },
);

app.post(
  "/post",
  [verifyToken, validateRequest(NewPostSchema, "body")],
  async (req: Request, res: Response, next: NextFunction) => {
    logger.info("Responding to /post");
    try {
      const { id } = req.headers;
      const { message, images, anonymous, themeId } = req.body;
      const result = await createNewPost(
        id as string,
        message,
        images,
        anonymous,
        themeId,
      );
      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },
);

// THEME
app.get("/themes", async (req: Request, res: Response, next: NextFunction) => {
  logger.info("Responding to /themes");
  const result = await getAllThemes();
  return res.status(200).json(result);
});

app.use(errorHandler());

// SERVER
app.listen(3030, () => {
  logger.info("Server starting");
});
