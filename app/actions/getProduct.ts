// app/actions/productActions.js

"use server";
import { revalidatePath } from "next/cache";
import clientPromise from "../lib/mongodb";

export async function getProduct() {
  try {
    const client = await clientPromise;
    const db = client.db("juwelary");

    const products = await db
      .collection("skillup-TEACHERCOLLECTION")
      .find({})
      .toArray();

    return products;
  } catch (error) {
    console.error("DB Error:");

    // Return a structured error object for the client to handle
    return {
      error: "Database fetch failed: " + "Unknown error",
    };
  }
}
