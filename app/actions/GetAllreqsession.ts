"use server";

import clientPromise from "../lib/mongodb";

import { currentUser } from "@clerk/nextjs/server";

export async function GetAllreqsession() {
  try {
    const user = await currentUser();
    if (!user) throw new Error("User not authenticated");
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME || "juwelary");

    const requestCollection = db.collection("requestSession");

    // Get all user requests
    const requests = await requestCollection
      .find()
      .sort({ createdAt: -1 })
      .toArray();

    return JSON.parse(JSON.stringify(requests));
  } catch (error) {
    console.error("Error in GetMyreqSession:", error);
    return [];
  }
}
