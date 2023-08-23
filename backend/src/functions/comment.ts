import getLogger from "src/utils/logger";
import { PrismaClient } from "@prisma/client";
import HttpError from "http-errors";
import { CommentType } from "src/schema/comment.schema";

const logger = getLogger();
const prisma = new PrismaClient();

export const createNewComment = async (
  userId: string,
  postId: string,
  message: string,
  images: string[],
  anonymous: boolean
): Promise<CommentType> => {
  // Assuming userId valid (checked by verifySession)
  // Check postId exists
  const postExists = await prisma.post.findFirst({
    where: {
      postId,
    },
  });
  if (!postExists) {
    logger.info(`Post with ${postId} doesn't exists.`);
    throw HttpError(400, `Post with ${postId} doesn't exists.`);
  }
  // Create the comment to the post with the given userId
  const newComment = await prisma.comment.create({
    data: {
      message,
      images,
      anonymous,
      author: {
        connect: {
          userId,
        },
      },
      post: {
        connect: {
          postId,
        },
      },
    },
    include: {
      author: true,
      post: true,
      replies: {
        include: {
          author: true,
        },
      },
    },
  });
  logger.info(`A new comment to post ${postId} created!`);
  return {
    commentId: newComment.commentId,
    message: newComment.message,
    images: newComment.images,
    anonymous: newComment.anonymous,
    likes: newComment.likes,
    author: {
      userId: newComment.author.userId,
      username: newComment.author.username,
      email: newComment.author.email,
      password: newComment.author.password,
      description: newComment.author.description,
      profilePicture: newComment.author.profilePicture,
    },
    replies: newComment.replies.map((r: any) => ({
      replyId: r.replyId,
      message: r.message,
      images: r.images,
      anonymous: r.anonymous,
      likes: r.likes,
      author: {
        userId: r.author.userId,
        username: r.author.username,
        email: r.author.email,
        password: r.author.password,
        description: r.author.description,
        profilePicture: r.author.profilePicture,
      },
    })),
  };
};

export const editComment = async (
  userId: string,
  commentId: string,
  message: string,
  images: string[],
  anonymous: boolean
): Promise<CommentType> => {
  // Assuming userId valid (checked by verifySession)
  // Check comment exists and owned by the user
  const commentExists = await prisma.comment.findFirst({
    where: {
      commentId,
      authorId: userId,
    },
  });
  if (!commentExists) {
    logger.info("Comment either doesn't belong to the user or doesn't exist");
    throw HttpError(400, "Comment cannot be found.");
  }
  const updatedComment = await prisma.comment.update({
    where: {
      commentId,
    },
    data: {
      message,
      images,
      anonymous,
    },
    include: {
      author: true,
      post: true,
      replies: {
        include: {
          author: true,
        },
      },
    },
  });
  logger.info(`Comment with commentId ${commentId} successfully updated!`);
  return {
    commentId: updatedComment.commentId,
    message: updatedComment.message,
    images: updatedComment.images,
    anonymous: updatedComment.anonymous,
    likes: updatedComment.likes,
    author: {
      userId: updatedComment.author.userId,
      username: updatedComment.author.username,
      email: updatedComment.author.email,
      password: updatedComment.author.password,
      description: updatedComment.author.description,
      profilePicture: updatedComment.author.profilePicture,
    },
    replies: updatedComment.replies.map((r: any) => ({
      replyId: r.replyId,
      message: r.message,
      images: r.images,
      anonymous: r.anonymous,
      likes: r.likes,
      author: {
        userId: r.author.userId,
        username: r.author.username,
        email: r.author.email,
        password: r.author.password,
        description: r.author.description,
        profilePicture: r.author.profilePicture,
      },
    })),
  };
};

export const deleteComment = async (
  userId: string,
  commentId: string
): Promise<object> => {
  // Assuming userId valid (checked by verifySession)
  // Check comment exists and owned by the user
  const commentExists = await prisma.comment.findFirst({
    where: {
      commentId,
      authorId: userId,
    },
  });
  if (!commentExists) {
    logger.info("Comment either doesn't belong to the user or doesn't exist");
    throw HttpError(400, "Comment cannot be found.");
  }
  // Delete comment
  await prisma.comment.delete({
    where: {
      commentId,
    },
  });
  logger.info(`Comment ${commentId} successfully deleted.`);
  return {};
};

export const likeComment = async (
  userId: string,
  commentId: string,
  like: boolean
) => {
  // Assuming userId is valid (checked by verifySession)
  // Check if postId is valid
  const comment = await prisma.comment.findFirst({
    where: {
      commentId,
    },
  });
  if (!comment) {
    logger.info(`Comment with commentId ${commentId} doesn't exists.`);
    throw HttpError(400, `Comment with commentId ${commentId} doesn't exists.`);
  }
  let newLikes = [...comment.likes];
  newLikes = like
    ? newLikes.includes(userId)
      ? newLikes
      : [...newLikes, userId]
    : newLikes.filter((l: string) => l !== userId);
  // Update database
  await prisma.comment.update({
    where: {
      commentId,
    },
    data: {
      likes: newLikes,
    },
  });
  logger.info(
    `Comment with commentId ${commentId} successfully ${
      like ? "liked" : "unliked"
    }`
  );
  return {};
};
