"use server";
import bcrypt from "bcryptjs";
import { collectionNames, dbConnect } from "@/lib/dbConnect";

export const registerUser = async (payload) => {
  const usersCollection = dbConnect(collectionNames.usersCollection);

  const { name, email, password, photo } = payload;
  if (!name || !email || !photo || !password) {
    return null;
  }
  payload.createdAt = new Date();
  const user = await usersCollection.findOne({ email });

  if (!user) {
    const hashedPassword = await bcrypt.hash(password, 10);
    payload.password = hashedPassword;
    const res = await usersCollection.insertOne(payload);
    return res;
  }

  return { message: "You already registered with this email" };
};
