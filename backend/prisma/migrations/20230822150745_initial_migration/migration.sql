/*
  Warnings:

  - You are about to drop the `_CommentToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PostToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ReplyToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `authorId` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorId` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorId` to the `Reply` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_CommentToUser" DROP CONSTRAINT "_CommentToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_CommentToUser" DROP CONSTRAINT "_CommentToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_PostToUser" DROP CONSTRAINT "_PostToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_PostToUser" DROP CONSTRAINT "_PostToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_ReplyToUser" DROP CONSTRAINT "_ReplyToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ReplyToUser" DROP CONSTRAINT "_ReplyToUser_B_fkey";

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "authorId" TEXT NOT NULL,
ADD COLUMN     "likes" TEXT[];

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "authorId" TEXT NOT NULL,
ADD COLUMN     "likes" TEXT[];

-- AlterTable
ALTER TABLE "Reply" ADD COLUMN     "authorId" TEXT NOT NULL,
ADD COLUMN     "likes" TEXT[];

-- DropTable
DROP TABLE "_CommentToUser";

-- DropTable
DROP TABLE "_PostToUser";

-- DropTable
DROP TABLE "_ReplyToUser";

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
