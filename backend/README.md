# Trainee 3 23T2 - Backend

## How to start

- Install all dependencies `npm install`
- Migrate prisma `DATABASE_URL=<database-url> npx prisma migrate dev`
- Run backend `JWT_SECRET=<jwt-secret> DATABASE_URL=<database-url> npm run dev`

## Routes

| Route                    | Method |           Description           |                                                                       Input                                                                       |                                                                    Output |
| :----------------------- | :----: | :-----------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------: | ------------------------------------------------------------------------: |
| /auth/register           |  POST  |         Register a user         |                                        Request Body: { username: string, email: string, password: string }                                        |                                 Return: { token: string, userId: string } |
| /auth/login              |  POST  |          Login a user           |                                               Request Body: { username: string, password: string }                                                |                                 Return: { token: string, userId: string } |
| /auth/logout             |  POST  | Logout a user (delete a token)  |                                              Request Headers: { Authorization: string, id: string }                                               |                                                                Return: {} |
| /themes                  |  GET   |    Get all available themes     |                                                                         -                                                                         | Return: { themes: **Theme**[] } - refer to ThemeSchema in theme.schema.ts |
| /posts                   |  GET   |  Get all posts (for homepage)   |                       Request Headers (optional): { Authorization: string, id: string }, Request Query: { offset: number }                        |     Return: { posts: **Post**[] } - refer to PostSchema in post.schema.ts |
| /post                    |  POST  |         Make a new post         | Request Headers: { Authorization: string, id: string }, Request Body: { message: string, images: string[], anonymous: boolean, themeId: string, } |                  Return: **Post** - refer to PostSchema in post.schema.ts |
| /post/:postId            |  GET   | Get a specific post information |                                                                         -                                                                         |                  Return: **Post** - refer to PostSchema in post.schema.ts |
| /post/:postId            |  PUT   |    Update a post information    | Request Headers: { Authorization: string, id: string }, Request Body: { message: string, images: string[], anonymous: boolean, themeId: string }  |                  Return: **Post** - refer to PostSchema in post.schema.ts |
| /post/:postId            | DELETE |          Delete a post          |                                              Request Headers: { Authorization: string, id: string }                                               |                                                                Return: {} |
| /post/like/:postId       |  POST  |       Like/Unlike a post        |                              Request Headers: { Authorization: string, id: string }, Request Body: { like: boolean }                              |                                                                Return: {} |
| /comment/:postId         |  POST  |        Comment to a post        |          Request Headers: { Authorization: string, id: string }, Request Body: { message: string, images: string[], anonymous: boolean }          |         Return: **Comment** - refer to CommentSchema in comment.schema.ts |
| /comment/:commentId      |  PUT   |         Edit a comment          |          Request Headers: { Authorization: string, id: string }, Request Body: { message: string, images: string[], anonymous: boolean }          |         Return: **Comment** - refer to CommentSchema in comment.schema.ts |
| /comment/:commentId      | DELETE |        Delete a comment         |                                              Request Headers: { Authorization: string, id: string }                                               |                                                                Return: {} |
| /comment/like/:commentId |  POST  |      Like/Unlike a comment      |                              Request Headers: { Authorization: string, id: string } Request Body: { like: boolean }                               |                                                                Return: {} |
| /reply/:postId           |  POST  |       Reply to a comment        |          Request Headers: { Authorization: string, id: string }, Request Body: { message: string, images: string[], anonymous: boolean }          |               Return: **Reply** - refer to ReplySchema in reply.schema.ts |
| /reply/:commentId        |  PUT   |          Edit a reply           |          Request Headers: { Authorization: string, id: string }, Request Body: { message: string, images: string[], anonymous: boolean }          |               Return: **Reply** - refer to ReplySchema in reply.schema.ts |
| /reply/:commentId        | DELETE |         Delete a reply          |                                              Request Headers: { Authorization: string, id: string }                                               |                                                                Return: {} |
| /reply/like/:commentId   |  POST  |       Like/Unlike a reply       |                              Request Headers: { Authorization: string, id: string } Request Body: { like: boolean }                               |                                                                Return: {} |

## Tools and Frameworks

Express, Prisma, PostgreSQL, Zod, Typescript
