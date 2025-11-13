"use server";

import clientPromise from "../lib/mongodb";
import { ObjectId } from "mongodb";
import { currentUser } from "@clerk/nextjs/server";

export async function DeleteRequestSession(requestId: string) {
  try {
    const user = await currentUser();
    if (!user) throw new Error("User not authenticated");

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME || "juwelary");

    const collection = db.collection("requestSession");

    const result = await collection.deleteOne({
      _id: new ObjectId(requestId),
      studentId: user.id,
    });

    if (result.deletedCount === 1) {
      return { success: true, message: "Request canceled successfully." };
    } else {
      return { success: false, message: "Failed to cancel request." };
    }
  } catch (error) {
    console.error("Error deleting request:", error);
    return { success: false, message: "Internal server error." };
  }
}
