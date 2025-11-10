"use server";

import { currentUser } from "@clerk/nextjs/server";
import clientPromise from "../lib/mongodb";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

export async function favorite(courseId: string) {
  try {
    // Get logged-in user
    const user = await currentUser();
    const userId = user?.id;

    if (!userId) {
      throw new Error("User not authenticated");
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("juwelary");
    const collection = db.collection("favorite");

    // Check if the course is already favorited by the user
    const existingFavorite = await collection.findOne({
      userId,
      courseId,
    });

    // If it exists, remove it (unfavorite)
    if (existingFavorite) {
      await collection.deleteOne({ _id: existingFavorite._id });

      revalidatePath("/userdashboard/favorites");
      return {
        success: true,
        message: "Removed from favorites",
        status: "removed",
      };
    }

    // Otherwise, add it to favorites
    const favoriteItem = {
      userId,
      courseId,
      createdAt: new Date(),
    };

    const result = await collection.insertOne(favoriteItem);

    revalidatePath("/userdashboard/favorites");
    return {
      success: true,
      message: "Added to favorites",
      status: "added",
    };
  } catch (error: any) {
    console.error("Error toggling favorite:", error);
    return {
      success: false,
      message: error.message || "Something went wrong",
    };
  }
}
