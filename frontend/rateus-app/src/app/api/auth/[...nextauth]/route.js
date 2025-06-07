import { REQUEST_TYPE } from "@/constants/request-type";
import { loginWithEmail } from "@/lib/api/back-auth";
import { parseJwt } from "@/lib/utils/parseJwt";
import nextAuthModule from "next-auth";
import credentialsProviderModule from "next-auth/providers/credentials";

const CredentialsProvider = credentialsProviderModule.default;
const NextAuth = nextAuthModule.default;

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        token: { label: "Token", type: "text" },
      },
      async authorize(credentials) {
        try {
          let token;
          if (credentials.token) {
            token = credentials.token;
          } else {
            const response = await loginWithEmail(
              {
                email: credentials.email,
                password: credentials.password,
              },
              REQUEST_TYPE.SSR
            );
            if (!response || !response.token) {
              console.log(response);
              const error = new Error(
                "Invalid response from server during authentication"
              );
              error.data.message = response?.data?.message;
              throw error;
            }
            token = response.token;
          }

          const user = parseJwt(token);
          return {
            token,
            ...user,
          };
        } catch (error) {
          console.error("Authorization failed", error);
          throw new Error(
            JSON.stringify({
              message: "Authorization failed",
              data: error.data,
            })
          );
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.token = user.token;
        token.uid = user.sub || user.uid;
        token.email = user.email;
        token.name = user.name;
        token.surname = user.surname;
        token.role = user.role;
        token.avatarUrl = user.avatarUrl;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        uid: token.uid,
        email: token.email,
        name: token.name,
        surname: token.surname,
        role: token.role,
        avatarUrl: token.avatarUrl,
      };
      session.token = token.token;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/sign-in",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
