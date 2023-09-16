import { PostType } from "../schema/post.schema";
import getLogger from "../utils/logger";
import HttpError from "http-errors";
import prisma from "../utils/prisma";

const logger = getLogger();

export const getAllPosts = async (
  offset: number,
  userId?: string
): Promise<{ posts: PostType[] }> => {
  // Assuming that userId is valid (checked by verifySession) and offset >= 0
  const defaultOptions: any = {
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
          textColor: true,
          backgroundColor: true,
          image: true,
        },
      },
      author: {
        select: {
          userId: true,
          username: true,
          email: true,
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
              description: true,
              profilePicture: true,
            },
          },
        },
      },
    },
  };
  const option = userId
    ? {
        where: {
          NOT: {
            authorId: userId,
          },
        },
        ...defaultOptions,
      }
    : defaultOptions;
  const posts = await prisma.post.findMany(option);
  logger.info(
    `Posts returned with offset ${offset} and total of ${posts.length} element(s).`
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
  themeId: string
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
      image: newPost.theme.image,
      backgroundColor: newPost.theme.backgroundColor,
      textColor: newPost.theme.textColor,
    },
    author: {
      userId: newPost.author.userId,
      username: newPost.author.username,
      email: newPost.author.email,
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
          userId: r.author.userId,
          username: r.author.username,
          email: r.author.email,
          description: r.author.description,
          profilePicture: r.author.profilePicture,
        },
      })),
      author: {
        userId: c.userId,
        username: c.username,
        email: c.email,
        description: c.description,
        profilePicture: c.profilePicture,
      },
    })),
  };
};

export const getPost = async (postId: string): Promise<PostType> => {
  // Check if postId exists
  const post = await prisma.post.findFirst({
    where: { postId },
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
  });
  if (!post) {
    logger.info(`Post with the given postId ${postId} doesn't exists`);
    throw HttpError(400, `Post with postId ${postId} doesn't exist`);
  }
  logger.info(`Post with postId ${postId} found.`);
  return {
    postId: post.postId,
    message: post.message,
    images: post.images,
    anonymous: post.anonymous,
    likes: post.likes,
    theme: {
      themeId: post.theme.themeId,
      name: post.theme.name,
      image: post.theme.image,
      backgroundColor: post.theme.backgroundColor,
      textColor: post.theme.textColor,
    },
    author: {
      userId: post.author.userId,
      username: post.author.username,
      email: post.author.email,
      description: post.author.description,
      profilePicture: post.author.profilePicture,
    },
    comments: post.comments.map((c: any) => ({
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
          userId: r.author.userId,
          username: r.author.username,
          email: r.author.email,
          description: r.author.description,
          profilePicture: r.author.profilePicture,
        },
      })),
      author: {
        userId: c.author.userId,
        username: c.author.username,
        email: c.author.email,
        description: c.author.description,
        profilePicture: c.author.profilePicture,
      },
    })),
  };
};

export const updatePost = async (
  userId: string,
  postId: string,
  message: string,
  images: string[],
  anonymous: boolean,
  themeId: string
): Promise<PostType> => {
  // Check if userId owns postId or post exists
  const postExists = await prisma.post.findFirst({
    where: {
      postId,
      authorId: userId,
    },
  });
  if (!postExists) {
    logger.info("Post either doesn't belong to the user or doesn't exist");
    throw HttpError(400, "Post cannot be found.");
  }
  // Update post
  const updatedPost = await prisma.post.update({
    where: {
      postId,
    },
    data: {
      message,
      images,
      anonymous,
      theme: {
        connect: {
          themeId,
        },
      },
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
  });
  logger.info(`Post with ${postId} successfully updated`);
  return {
    postId: updatedPost.postId,
    message: updatedPost.message,
    images: updatedPost.images,
    anonymous: updatedPost.anonymous,
    likes: updatedPost.likes,
    theme: {
      themeId: updatedPost.theme.themeId,
      name: updatedPost.theme.name,
      image: updatedPost.theme.image,
      backgroundColor: updatedPost.theme.backgroundColor,
      textColor: updatedPost.theme.textColor,
    },
    author: {
      userId: updatedPost.author.userId,
      username: updatedPost.author.username,
      email: updatedPost.author.email,
      description: updatedPost.author.description,
      profilePicture: updatedPost.author.profilePicture,
    },
    comments: updatedPost.comments.map((c: any) => ({
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
          userId: r.author.userId,
          username: r.author.username,
          email: r.author.email,
          description: r.author.description,
          profilePicture: r.author.profilePicture,
        },
      })),
      author: {
        userId: c.author.userId,
        username: c.author.username,
        email: c.author.email,
        description: c.author.description,
        profilePicture: c.author.profilePicture,
      },
    })),
  };
};

export const deletePost = async (
  userId: string,
  postId: string
): Promise<object> => {
  // Check if userId owns postId or post exists
  const postExists = await prisma.post.findFirst({
    where: {
      postId,
      authorId: userId,
    },
  });
  if (!postExists) {
    logger.info("Post either doesn't belong to the user or doesn't exist");
    throw HttpError(400, "Post cannot be found.");
  }
  // Delete post
  await prisma.post.delete({
    where: {
      postId,
    },
  });
  logger.info(`Post ${postId} successfully deleted.`);
  return {};
};

export const likePost = async (
  userId: string,
  postId: string,
  like: boolean
): Promise<object> => {
  // Assuming userId is valid (checked by verifySession)
  // Check if postId is valid
  const post = await prisma.post.findFirst({
    where: {
      postId,
    },
  });
  if (!post) {
    logger.info(`Post with postId ${postId} doesn't exists.`);
    throw HttpError(400, `Post with postId ${postId} doesn't exists.`);
  }
  let newLikes = [...post.likes];
  newLikes = like
    ? newLikes.includes(userId)
      ? newLikes
      : [...newLikes, userId]
    : newLikes.filter((l: string) => l !== userId);
  // Update database
  await prisma.post.update({
    where: {
      postId,
    },
    data: {
      likes: newLikes,
    },
  });
  logger.info(
    `Post with postId ${postId} successfully ${like ? "liked" : "unliked"}`
  );
  return {};
};
