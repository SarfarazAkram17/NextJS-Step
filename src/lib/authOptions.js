import { loginUser } from "@/app/actions/loginUser";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { collectionNames, dbConnect } from "./dbConnect";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Enter Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter Password",
        },
      },
      async authorize(credentials, req) {
        const user = await loginUser(credentials);
        if (user) {
          return {
            name: user.name,
            email: user.email,
            image: user.photo,
          };
        } else {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account) {
        const { providerAccountId, provider } = account;
        const { email, image, name } = user;

        const usersCollection = dbConnect(collectionNames.usersCollection);
        const isExisted = await usersCollection.findOne({ providerAccountId });
        if (!isExisted) {
          const payload = {
            providerAccountId,
            provider,
            email,
            photo: image,
            name,
            createdAt: new Date()
          };
          await usersCollection.insertOne(payload);
        }
      }
      return true;
    },
  },
};