// actions/teacherActions.ts
"use server";

import { redirect } from "next/navigation";
import clientPromise from "../lib/mongodb";
import { ObjectId } from "mongodb";

export async function GetDeteils(id: string) {
  console.log(id);
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME || "juwelary");
    const applicationsCollection = db.collection("courses");

    const result = await applicationsCollection.findOne({
      _id: new ObjectId(id),
    });
    console.log(result);
    return result;
  } catch (error) {
    console.error("MongoDB/DB Error in applyForTeacher:", error);
  }
}
