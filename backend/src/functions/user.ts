import { PrismaClient } from "@prisma/client";
import getLogger from "src/utils/logger";
import HttpError from "http-errors";
import { UserType } from "src/schema/user.schema";
import getHash from "src/utils/hash";

const logger = getLogger();
const prisma = new PrismaClient();

export const getUser = async (
  userId: string,
  isUser: boolean
): Promise<object> => {
  // Check if user exists
  const user = isUser
    ? await prisma.user.findFirst({
        where: {
          userId,
        },
        include: {
          posts: {
            include: {
              author: true,
              theme: true,
              comments: {
                include: {
                  author: true,
                  replies: {
                    include: {
                      author: true,
                    },
                  },
                },
              },
            },
          },
          comments: {
            include: {
              author: true,
              replies: {
                include: {
                  author: true,
                },
              },
            },
          },
          replies: {
            include: {
              author: true,
            },
          },
        },
      })
    : await prisma.user.findFirst({
        where: {
          userId,
        },
        include: {
          posts: {
            where: {
              anonymous: false,
            },
            include: {
              author: true,
              theme: true,
              comments: {
                include: {
                  author: true,
                  replies: {
                    include: {
                      author: true,
                    },
                  },
                },
              },
            },
          },
          comments: {
            where: {
              anonymous: false,
            },
            include: {
              author: true,
              replies: {
                include: {
                  author: true,
                },
              },
            },
          },
          replies: {
            where: {
              anonymous: false,
            },
            include: {
              author: true,
            },
          },
        },
      });
  if (!user) {
    logger.info(`User with userId ${userId} doesn't exists.`);
    throw HttpError(400, `User with userId ${userId} doesn't exists`);
  }
  return {
    userId: user.userId,
    username: user.username,
    email: user.email,
    description: user.description,
    profilePicture: user.profilePicture,
    posts: user.posts.map((p: any) => ({
      postId: p.postId,
      message: p.message,
      images: p.images,
      anonymous: p.anonymous,
      likes: p.likes,
      theme: {
        themeId: p.theme.themeId,
        name: p.theme.name,
      },
      author: {
        userId: p.author.userId,
        username: p.author.username,
        email: p.author.email,
        description: p.author.description,
        profilePicture: p.author.profilePicture,
      },
      comments: p.comments.map((c: any) => ({
        commentId: c.commentId,
        message: c.message,
        images: c.images,
        anonymous: c.anonymous,
        likes: c.likes,
        author: {
          userId: c.author.userId,
          username: c.author.username,
          email: c.author.email,
          description: c.author.description,
          profilePicture: c.author.profilePicture,
        },
        replies: c.replies.map((r: any) => ({
          replyId: r.replyId,
          message: r.message,
          images: r.images,
          anonymous: r.anonymous,
          likes: r.likes,
          author: {
            userId: r.author.userId,
            username: r.author.username,
            email: r.author.email,
            description: r.author.description,
            profilePicture: r.author.profilePicture,
          },
        })),
      })),
    })),
    comments: user.comments.map((c: any) => ({
      commentId: c.commentId,
      message: c.message,
      images: c.images,
      anonymous: c.anonymous,
      likes: c.likes,
      author: {
        userId: c.author.userId,
        username: c.author.username,
        email: c.author.email,
        description: c.author.description,
        profilePicture: c.author.profilePicture,
      },
      replies: c.replies.map((r: any) => ({
        replyId: r.replyId,
        message: r.message,
        images: r.images,
        anonymous: r.anonymous,
        likes: r.likes,
        author: {
          userId: r.author.userId,
          username: r.author.username,
          email: r.author.email,
          description: r.author.description,
          profilePicture: r.author.profilePicture,
        },
      })),
    })),
    replies: user.replies.map((r: any) => ({
      replyId: r.replyId,
      message: r.message,
      images: r.images,
      anonymous: r.anonymous,
      likes: r.likes,
      author: {
        userId: r.author.userId,
        username: r.author.username,
        email: r.author.email,
        description: r.author.description,
        profilePicture: r.author.profilePicture,
      },
    })),
  };
};

export const updateUser = async (
  userId: string,
  username: string,
  email: string,
  password: string,
  description: string,
  profilePicture: string
) => {
  // Check user exists
  const userExists = await prisma.user.findFirst({
    where: {
      userId,
    },
  });
  if (!userExists) {
    logger.info(`User with userId ${userId} doesn't exists.`);
    throw HttpError(400, `User with userId ${userId} doesn't exists`);
  }
  // Check if email or username has been used
  const emailUsed = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  if (emailUsed && email !== userExists.email) {
    logger.info(`Email ${email} already used.`);
    throw HttpError(400, "Email given already used.");
  }
  const usernameUsed = await prisma.user.findFirst({
    where: {
      username,
    },
  });
  if (usernameUsed && username !== userExists.username) {
    logger.info(`Username ${username} already used.`);
    throw HttpError(400, "Username given already used.");
  }
  // Update user
  await prisma.user.update({
    where: {
      userId,
    },
    data: {
      username,
      email,
      password: getHash(password),
      description,
      profilePicture,
    },
  });
  return {};
};

export const deleteUser = async (userId: string) => {
  // Check user exists
  const userExists = await prisma.user.findFirst({
    where: {
      userId,
    },
  });
  if (!userExists) {
    logger.info(`User with userId ${userId} doesn't exists.`);
    throw HttpError(400, `User with userId ${userId} doesn't exists`);
  }
  // Delete user
  await prisma.user.delete({
    where: {
      userId,
    },
  });
  return {};
};
