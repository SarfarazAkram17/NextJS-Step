"use server";
import { dbConnect, collectionNames } from "@/lib/dbConnect";

export const addProduct = async (payload) => {
  const { name, description, price, image, category, addedBy } = payload;

  if (!name || !description || !price || !image || !addedBy) {
    return { success: false, message: "All fields are required" };
  }

  const productsCollection = dbConnect(collectionNames.productsCollection);

  const newProduct = {
    name,
    description,
    price: parseFloat(price),
    image,
    category: category || "General",
    addedBy,
    createdAt: new Date(),
  };

  const res = await productsCollection.insertOne(newProduct);

  if (res.insertedId) {
    return { success: true, message: "Product added successfully" };
  } else {
    return { success: false, message: "Failed to add product" };
  }
};