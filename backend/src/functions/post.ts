import { PrismaClient } from "@prisma/client";
import { PostType } from "src/schema/post.schema";
import getLogger from "src/utils/logger";
import HttpError from "http-errors";

const logger = getLogger();
const prisma = new PrismaClient();

export const getAllPosts = async (
  userId: string,
  offset: number,
): Promise<{ posts: PostType[] }> => {
  // Assuming that userId is valid (checked by verifyToken) and offset >= 0
  const posts = await prisma.post.findMany({
    where: {
      NOT: {
        authorId: userId,
      },
    },
    skip: offset,
    take: 25,
    select: {
      postId: true,
      message: true,
      images: true,
      anonymous: true,
      likes: true,
      theme: {
        select: {
          themeId: true,
          name: true,
        },
      },
      author: {
        select: {
          username: true,
          email: true,
          password: true,
          description: true,
          profilePicture: true,
        },
      },
      comments: {
        select: {
          commentId: true,
          message: true,
          images: true,
          anonymous: true,
          likes: true,
          replies: {
            select: {
              replyId: true,
              message: true,
              images: true,
              anonymous: true,
              likes: true,
              author: {
                select: {
                  userId: true,
                  username: true,
                  email: true,
                  password: true,
                  description: true,
                  profilePicture: true,
                },
              },
            },
          },
          author: {
            select: {
              userId: true,
              username: true,
              email: true,
              password: true,
              description: true,
              profilePicture: true,
            },
          },
        },
      },
    },
  });
  logger.info(
    `Posts returned with offset ${offset} and total of ${posts.length} element(s).`,
  );
  return {
    posts,
  };
};

export const createNewPost = async (
  userId: string,
  message: string,
  images: string[],
  anonymous: boolean,
  themeId: string,
): Promise<PostType> => {
  // Assuming that id is valid and other arguments is in a valid type
  // Check if themeId exists
  const themeExists = await prisma.theme.findFirst({
    where: {
      themeId,
    },
  });
  if (!themeExists) {
    logger.info("Given theme doesn't exists.");
    throw HttpError(400, "The given theme doesn't exists");
  }
  // Create the post
  const newPost = await prisma.post.create({
    data: {
      message,
      images,
      anonymous,
      author: {
        connect: {
          userId,
        },
      },
      theme: {
        connect: {
          themeId,
        },
      },
    },
    include: {
      author: true,
      theme: true,
      comments: true,
    },
  });
  logger.info("New post created!");
  return {
    postId: newPost.postId,
    message: newPost.message,
    images: newPost.images,
    anonymous: newPost.anonymous,
    likes: newPost.likes,
    theme: {
      themeId: newPost.theme.themeId,
      name: newPost.theme.name,
    },
    author: {
      userId: newPost.author.userId,
      username: newPost.author.username,
      email: newPost.author.email,
      password: newPost.author.password,
      description: newPost.author.description,
      profilePicture: newPost.author.profilePicture,
    },
    comments: newPost.comments.map((c: any) => ({
      commentId: c.commentId,
      message: c.message,
      images: c.images,
      anonymous: c.anonymous,
      likes: c.likes,
      replies: c.replies.map((r: any) => ({
        replyId: r.replyId,
        message: r.message,
        images: r.images,
        anonymous: r.anonymous,
        likes: r.likes,
        author: {
          userId: newPost.author.userId,
          username: newPost.author.username,
          email: newPost.author.email,
          password: newPost.author.password,
          description: newPost.author.description,
          profilePicture: newPost.author.profilePicture,
        },
      })),
      author: {
        userId: newPost.author.userId,
        username: newPost.author.username,
        email: newPost.author.email,
        password: newPost.author.password,
        description: newPost.author.description,
        profilePicture: newPost.author.profilePicture,
      },
    })),
  };
};
