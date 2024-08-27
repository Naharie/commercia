import {DrizzleAdapter} from "@auth/drizzle-adapter";
import {type DefaultSession, getServerSession, type NextAuthOptions,} from "next-auth";
import {type Adapter} from "next-auth/adapters";
import {db} from "~/server/db";
import {accounts, sessions, users, verificationTokens,} from "~/server/db/schema";
import CredentialsProvider from "next-auth/providers/credentials";
import {eq} from "drizzle-orm";
import bcrypt from "bcrypt";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
    interface Session extends DefaultSession {
        user: {
            id: string;
        } & DefaultSession["user"];
    }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt"
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                if (!credentials) return null;
                
                const user = (await db
                    .select({ id: users.id, password: users.password })
                    .from(users)
                    .where(eq(users.email, credentials.email))
                    .limit(1)
                )[0];
                if (user == undefined) return null;
                
                if (!(await bcrypt.compare(credentials.password, user.password)))
                {
                    return null;
                }
                
                return { id: user.id };
            }
        })
    ],
    callbacks: {
        jwt: async ({ token, user }) =>
        {
            if (user)
            {
                token.id = user.id;
            }
            
            return token;
        },
        session: async ({session, token}) =>
        {
            session.user.id = token.id as string;
            return session;
        },
    },
    adapter: DrizzleAdapter(db, {
        usersTable: users,
        accountsTable: accounts,
        sessionsTable: sessions,
        verificationTokensTable: verificationTokens,
    }) as Adapter
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
