"use server";

import clientPromise from "../lib/mongodb";
import { ObjectId } from "mongodb";
import { currentUser } from "@clerk/nextjs/server";

export async function GetMyCourses() {
  const user = await currentUser();
  const id = user?.id;
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME || "juwelary");
    const applicationsCollection = db.collection("courses");

    const result = await applicationsCollection
      .find({
        teacherId: id,
      })
      .toArray();
    return result;
  } catch (error) {
    console.error("MongoDB/DB Error in applyForTeacher:", error);
  }
}
