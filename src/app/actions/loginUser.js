"use server";
import { collectionNames, dbConnect } from "@/lib/dbConnect";
import bcrypt from "bcryptjs";

export const loginUser = async (payload) => {
  const { email, password } = payload;

  const usersCollection = dbConnect(collectionNames.usersCollection);
  const user = await usersCollection.findOne({ email });

  if (!user) return null;

  const isPasswordOK = await bcrypt.compare(password, user.password);

  if (!isPasswordOK) return null;

  return user;
};
