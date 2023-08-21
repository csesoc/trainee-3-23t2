# Trainee 3 23T2 - Backend

## How to start

- Install all dependencies `npm install`
- Migrate prisma `DATABASE_URL=<database-url> npx prisma migrate dev`
- Run backend `JWT_SECRET=<jwt-secret> DATABASE_URL=<database-url> npx prisma migrate dev`

## Routes

| Route          | Method |                                Input                                |                                    Output |
| :------------- | :----: | :-----------------------------------------------------------------: | ----------------------------------------: |
| /auth/register |  POST  | Request Body: { username: string, email: string, password: string } | Return: { token: string, userId: string } |
| /auth/login    |  POST  |        Request Body: { username: string, password: string }         | Return: { token: string, userId: string } |
| /auth/logout   | DELETE |     Request Headers: { Authorization: string, userId: string }      |                                Return: {} |

## Tools and Frameworks

Express, Prisma, PostgreSQL, Zod, Typescript
