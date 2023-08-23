-- CreateTable
CREATE TABLE "Theme" (
    "theme_id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,

    CONSTRAINT "pk_theme_id" PRIMARY KEY ("theme_id")
);

-- CreateTable
CREATE TABLE "User" (
    "user_id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "profile_picture" TEXT NOT NULL,

    CONSTRAINT "pk_user_id" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Post" (
    "post_id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "theme_id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "images" TEXT[],
    "anonymous" BOOLEAN NOT NULL,
    "likes" TEXT[],
    "authorId" TEXT NOT NULL,

    CONSTRAINT "pk_post_id" PRIMARY KEY ("post_id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "comment_id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "post_id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "images" TEXT[],
    "anonymous" BOOLEAN NOT NULL,
    "likes" TEXT[],
    "authorId" TEXT NOT NULL,

    CONSTRAINT "pk_comment_id" PRIMARY KEY ("comment_id")
);

-- CreateTable
CREATE TABLE "Reply" (
    "reply_id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "comment_id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "images" TEXT[],
    "anonymous" BOOLEAN NOT NULL,
    "likes" TEXT[],
    "authorId" TEXT NOT NULL,

    CONSTRAINT "pk_reply_id" PRIMARY KEY ("reply_id")
);

-- CreateTable
CREATE TABLE "Token" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiredBy" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Theme_name_key" ON "Theme"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Token_token_key" ON "Token"("token");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_theme_id_fkey" FOREIGN KEY ("theme_id") REFERENCES "Theme"("theme_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("post_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "Comment"("comment_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
