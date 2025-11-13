"use server";

import clientPromise from "../lib/mongodb";
import { ObjectId } from "mongodb";

export async function updateSessionStatus(
  requestId: string,
  status: "approved" | "rejected"
) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME || "juwelary");
    const collection = db.collection("requestSession");

    const result = await collection.updateOne(
      { _id: new ObjectId(requestId) },
      {
        $set: {
          status,
          updatedAt: new Date(),
        },
      }
    );

    if (result.modifiedCount === 0) {
      return {
        success: false,
        message: "Request not found or already updated.",
      };
    }

    return { success: true, message: `Request ${status} successfully.` };
  } catch (err) {
    console.error("Error updating session status:", err);
    return { success: false, message: "Internal server error." };
  }
}
