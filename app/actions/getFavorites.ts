"use server";

import { currentUser } from "@clerk/nextjs/server";
import clientPromise from "../lib/mongodb";
import { ObjectId } from "mongodb";

export async function getFavorites() {
  try {
    // ✅ Get current logged-in user
    const user = await currentUser();
    const userId = user?.id;

    if (!userId) {
      throw new Error("User not authenticated");
    }

    // ✅ Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("juwelary");

    const favoritesCollection = db.collection("favorite");
    const coursesCollection = db.collection("courses"); // assuming you store courses here

    // ✅ Find all favorites for this user
    const favorites = await favoritesCollection.find({ userId }).toArray();

    if (favorites.length === 0) {
      return [];
    }

    // ✅ Extract course IDs and fetch course details
    const courseIds = favorites.map((fav) => fav.courseId);

    // Convert to ObjectId only if your course IDs are ObjectId
    const courses = await coursesCollection
      .find({
        _id: { $in: courseIds.map((id) => new ObjectId(id)) },
      })
      .toArray();

    // ✅ Return both course data + metadata (if needed)
    return courses.map((course) => ({
      ...course,
      isFavorite: true,
    }));
  } catch (error: any) {
    console.error("Error fetching favorites:", error);
    return [];
  }
}
