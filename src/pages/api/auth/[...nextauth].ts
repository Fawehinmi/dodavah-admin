import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { ClientError, gql, GraphQLClient } from "graphql-request";
import jwt from "jsonwebtoken";
import { JWT } from "next-auth/jwt";

const apolloClient = new GraphQLClient(
  `${process.env.NEXT_PUBLIC_BASE_URL}/graphql`,
  {
    credentials: "include",
  }
);

const SIGN_IN = gql`
  mutation signIn($email: String!, $password: String!, $client: String!) {
    signIn(email: $email, password: $password, client: $client) {
      userId
      name
      token
      roles
    }
  }
`;

const PROFILE = gql`
  query user($id: String!) {
    user(id: $id) {
      _id
      firstName
      lastName
      roles
    }
  }
`;

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any, req: any) {
        const payload = {
          email: credentials.email,
          password: credentials.password,
          client: "Admin",
        };

        return await apolloClient
          .request(SIGN_IN, payload)
          .then((res) => {
            const { name, userId, roles } = res.signIn;
            return { name, id: userId, roles, user: res.signIn };
          })
          .catch((err) => {
            const errorResult = typeof err === "string" ? { error: err } : err;
            const error: any = new ClientError(
              { ...errorResult },
              { query: SIGN_IN as any, variables: payload }
            );
            throw error.response.response?.errors[0];
          });
      },
    }),
  ],
  jwt: {
    secret: process.env.TOKEN_SECRET,
    async encode(data: any) {
      const { secret, token, user } = data;
      // console.log("LOG 1 encode", data);
      const jwtClaims = {
        sub: token.sub,
        name: token.name,
      };

      const encodedToken = jwt.sign(jwtClaims, secret, {
        expiresIn: "60 days",
        algorithm: "HS512",
      });
      return encodedToken;
    },
    async decode(data: any) {
      const { secret, token, maxAge } = data;
      const verify = jwt.verify(token, secret) as JWT;

      return verify;
    },
  },

  callbacks: {
    async session(params: any) {
      const { session, token } = params;

      const user = session.user._id
        ? { account: session.user }
        : await apolloClient.request(PROFILE, { id: token.sub });

      const encodedToken = jwt.sign(token, process.env.TOKEN_SECRET as any, {
        algorithm: "HS256",
      });

      session.id = token.sub;
      session.token = encodedToken;
      session.user = {
        ...user.user,
        name: `${user.user.firstName} ${user.user.lastName}`,
      };
      return Promise.resolve(session);
    },
    async jwt(params: any) {
      const { token, user, account, profile, isNewUser } = params;

      if (user && user.id) token._id = user?.id;

      return token;
    },
  },
  pages: {
    // signIn: "/auth/signin",
  },
  secret: process.env.TOKEN_SECRET,
  session: {
    strategy: "jwt" as any,
    maxAge: parseInt(process.env.TOKEN_MAX_AGE as string),
  },
};
export default NextAuth(authOptions);
