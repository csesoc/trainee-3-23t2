import { PrismaClient } from "@prisma/client";
import getLogger from "src/utils/logger";
import validator from "validator";
import HttpError from "http-errors";
import getHash from "src/utils/hash";
import { generateToken } from "src/utils/token";

const logger = getLogger();
const prisma = new PrismaClient();

export const registerUser = async (
  username: string,
  email: string,
  password: string,
): Promise<{ token: string; expiredBy: Date; userId: string }> => {
  // Check if email or password is valid
  if (!validator.isEmail(email) || !username || !password) {
    logger.info("Data provided is of invalid format");
    throw HttpError(400, "Invalid credentials");
  }

  // Get user if exists
  const userWithEmail = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  const userWithUsername = await prisma.user.findFirst({
    where: {
      username,
    },
  });

  // User with the given username already exists
  if (userWithUsername) {
    logger.info(`User with username ${username} already exists.`);
    throw HttpError(400, "Username already exists");
  }

  // User with the given email already exists
  if (userWithEmail) {
    logger.info(`User with email ${email} already exists.`);
    throw HttpError(400, "Email already used");
  }

  // Save user to db
  const newUser = await prisma.user.create({
    data: {
      email,
      username,
      password: getHash(password),
      description: "Hello, I'm new here!",
      profilePicture:
        "data:image/jpeg;base64,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",
    },
  });
  const { token: newGeneratedToken, expiredBy } = generateToken(newUser.userId);
  await prisma.token.create({
    data: {
      token: getHash(newGeneratedToken),
      userId: newUser.userId,
      expiredBy,
    },
  });
  logger.info(`User with email ${email} created.`);

  return {
    token: `Bearer ${newGeneratedToken}`,
    expiredBy,
    userId: newUser.userId,
  };
};

export const loginUser = async (
  username: string,
  password: string,
): Promise<{ token: string; expiredBy: Date; userId: string }> => {
  // Check if email or password is valid
  if (!username || !password) {
    logger.info("Data provided is of invalid format");
    throw HttpError(400, "Invalid credentials");
  }

  // Get user if exists
  const user = await prisma.user.findFirst({
    where: {
      username,
    },
  });

  // User with the given email doesn't exists
  // or password doesn't match
  if (!user || getHash(password) !== user.password) {
    logger.info("Invalid credentials.");
    throw HttpError(400, "Credentials invalid");
  }

  // Generate new token
  const { token: newGeneratedToken, expiredBy } = generateToken(user.userId);
  await prisma.token.create({
    data: {
      token: getHash(newGeneratedToken),
      userId: user.userId,
      expiredBy,
    },
  });
  logger.info(`User with username ${username} logged in.`);

  return {
    token: `Bearer ${newGeneratedToken}`,
    expiredBy,
    userId: user.userId,
  };
};

export const logoutUser = async (token: string): Promise<object> => {
  // Assuming that token and userId already verified
  // Delete token immediately
  await prisma.token.delete({
    where: {
      token: getHash(token),
    },
  });
  logger.info(`Token ${token} deleted.`);
  return {};
};
