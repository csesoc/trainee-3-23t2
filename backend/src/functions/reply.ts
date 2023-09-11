import { ReplyType } from "../schema/reply.schema";
import getLogger from "../utils/logger";
import HttpError from "http-errors";
import prisma from "../utils/prisma";

const logger = getLogger();

export const createNewReply = async (
  userId: string,
  commentId: string,
  message: string,
  images: string[],
  anonymous: boolean
): Promise<ReplyType> => {
  // Assuming userId valid (checked by verifySession)
  // Check commentId exists
  const commentExists = await prisma.comment.findFirst({
    where: {
      commentId,
    },
  });
  if (!commentExists) {
    logger.info(`Comment with ${commentId} doesn't exists.`);
    throw HttpError(400, `Comment with ${commentId} doesn't exists.`);
  }
  // Create the reply to the comment with the given userId
  const newReply = await prisma.reply.create({
    data: {
      message,
      images,
      anonymous,
      author: {
        connect: {
          userId,
        },
      },
      Comment: {
        connect: {
          commentId,
        },
      },
    },
    include: {
      author: true,
      Comment: true,
    },
  });
  logger.info(`New reply to comment ${commentId} created!`);
  return {
    replyId: newReply.replyId,
    message: newReply.message,
    images: newReply.images,
    anonymous: newReply.anonymous,
    likes: newReply.likes,
    author: {
      userId: newReply.author.userId,
      username: newReply.author.username,
      email: newReply.author.email,
      description: newReply.author.description,
      profilePicture: newReply.author.profilePicture,
    },
  };
};

export const updateReply = async (
  userId: string,
  replyId: string,
  message: string,
  images: string[],
  anonymous: boolean
): Promise<ReplyType> => {
  // Assuming userId valid (checked by verifySession)
  // Check reply exists and owned by the user
  const replyExists = await prisma.reply.findFirst({
    where: {
      replyId,
      authorId: userId,
    },
  });
  if (!replyExists) {
    logger.info("Reply either doesn't belong to the user or doesn't exist");
    throw HttpError(400, "Reply cannot be found.");
  }
  const updatedReply = await prisma.reply.update({
    where: {
      replyId,
    },
    data: {
      message,
      images,
      anonymous,
    },
    include: {
      author: true,
      Comment: true,
    },
  });
  logger.info(`Reply with replyId ${replyId} successfully updated!`);
  return {
    replyId: updatedReply.replyId,
    message: updatedReply.message,
    images: updatedReply.images,
    anonymous: updatedReply.anonymous,
    likes: updatedReply.likes,
    author: {
      userId: updatedReply.author.userId,
      username: updatedReply.author.username,
      email: updatedReply.author.email,
      description: updatedReply.author.description,
      profilePicture: updatedReply.author.profilePicture,
    },
  };
};

export const deleteReply = async (
  userId: string,
  replyId: string
): Promise<object> => {
  // Assuming userId valid (checked by verifySession)
  // Check reply exists and owned by the user
  const replyExists = await prisma.reply.findFirst({
    where: {
      replyId,
      authorId: userId,
    },
  });
  if (!replyExists) {
    logger.info("Reply either doesn't belong to the user or doesn't exist");
    throw HttpError(400, "Reply cannot be found.");
  }
  // Delete reply
  await prisma.reply.delete({
    where: {
      replyId,
    },
  });
  logger.info(`Reply ${replyId} successfully deleted.`);
  return {};
};

export const likeReply = async (
  userId: string,
  replyId: string,
  like: boolean
): Promise<object> => {
  // Assuming userId is valid (checked by verifySession)
  // Check if replyId is valid
  const reply = await prisma.reply.findFirst({
    where: {
      replyId,
    },
  });
  if (!reply) {
    logger.info(`Reply with replyId ${replyId} doesn't exists.`);
    throw HttpError(400, `Reply with replyId ${replyId} doesn't exists.`);
  }
  let newLikes = [...reply.likes];
  newLikes = like
    ? newLikes.includes(userId)
      ? newLikes
      : [...newLikes, userId]
    : newLikes.filter((l: string) => l !== userId);
  // Update database
  await prisma.reply.update({
    where: {
      replyId,
    },
    data: {
      likes: newLikes,
    },
  });
  logger.info(
    `Reply with replyId ${replyId} successfully ${like ? "liked" : "unliked"}`
  );
  return {};
};
