# Trainee 3 23T2 - Backend

## How to start

- Install all dependencies `npm install`
- Migrate prisma `DATABASE_URL=<database-url> npx prisma migrate dev`
- Run backend `JWT_SECRET=<jwt-secret> DATABASE_URL=<database-url> npx prisma migrate dev`

## Routes

| Route          | Method |                                                                       Input                                                                       |                                                                    Output |
| :------------- | :----: | :-----------------------------------------------------------------------------------------------------------------------------------------------: | ------------------------------------------------------------------------: |
| /auth/register |  POST  |                                        Request Body: { username: string, email: string, password: string }                                        |                                 Return: { token: string, userId: string } |
| /auth/login    |  POST  |                                               Request Body: { username: string, password: string }                                                |                                 Return: { token: string, userId: string } |
| /auth/logout   |  POST  |                                              Request Headers: { Authorization: string, id: string }                                               |                                                                Return: {} |
| /posts         |  GET   |                             Request Headers: { Authorization: string, id: string }, Request Query: { offset: number }                             |     Return: { posts: **Post**[] } - refer to PostSchema in post.schema.ts |
| /post          |  POST  | Request Headers: { Authorization: string, id: string }, Request Body: { message: string, images: string[], anonymous: boolean, themeId: string, } |                  Return: **Post** - refer to PostSchema in post.schema.ts |
| /themes        |  GET   |                                                                         -                                                                         | Return: { themes: **Theme**[] } - refer to ThemeSchema in theme.schema.ts |

## Tools and Frameworks

Express, Prisma, PostgreSQL, Zod, Typescript
