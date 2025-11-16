"use server";

import clientPromise from "../lib/mongodb";

export async function getfetured() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME || "juwelary");
    const collection = db.collection("courses");

    const featuredCourses = await collection
      .find({ isfetured: true })
      .sort({ createdAt: -1 })
      .toArray();
    console.log(featuredCourses);
    return featuredCourses;
  } catch (error) {
    console.error("Error fetching featured courses:", error);
  }
}
