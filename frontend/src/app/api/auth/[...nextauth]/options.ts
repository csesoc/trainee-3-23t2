import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Login",
            credentials: {
                username: {
                    label: "Username:",
                    type: "text",
                    placeholder: "your-cool-username"
                },
                password: {
                    label: "Password:",
                    type: "password",
                    placeholder: "your-awesome-password"
                }
            },
            async authorize(credentials) {
                // This is where you need to retrieve user data 
                // to verify with credentials
                // Docs: https://next-auth.js.org/configuration/providers/credentials

                // retrieve user from database, compare with credentials
                const user = { id: "42", name: "Dave", password: "nextauth" }

                if (credentials?.username === user.name && credentials?.password === user.password) {
                    return user
                } else {
                    return null
                }
            }
        }),
        CredentialsProvider({
            name: "Register",
            credentials: {
                username: {
                    label: "Username:",
                    type: "text",
                    placeholder: "your-cool-username"
                },
                email: {
                    label: "Email:",
                    type: "text",
                    placeholder: "your-email"
                },
                password: {
                    label: "Password:",
                    type: "password",
                    placeholder: "your-awesome-password"
                },
                confirmation: {
                    label: "Confirmation",
                    type: "password",
                    placeholder:"your-awesome-password-again"
                }
            },
            async authorize(credentials) {
                // This is where you need to retrieve user data 
                // to verify with credentials
                // Docs: https://next-auth.js.org/configuration/providers/credentials
                const user = { id: "42", name: "Dave", password: "nextauth" }

                if (credentials?.password != credentials?.confirmation) {
                    return null
                }

                // check if username already exists

                // check password validity

                if (credentials?.username === user.name && credentials?.password === user.password) {
                    return user
                } else {
                    return null
                }
            }
        })
    ],
}