// --- SERVER ACTION (makeFeatured.ts) ---
"use server";
import clientPromise from "../lib/mongodb";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

export async function makefetured(courseId: string) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME || "juwelary");
    const collection = db.collection("courses");

    const course = await collection.findOne({ _id: new ObjectId(courseId) });
    if (!course) return { success: false, message: "Course not found" };

    const updated = await collection.findOneAndUpdate(
      { _id: new ObjectId(courseId) },
      { $set: { isfetured: !course.isfetured } },
      { returnDocument: "after" }
    );

    return {
      success: true,
      isfetured: updated?.isfetured,
      message: updated?.isfetured
        ? "Added to Featured"
        : "Removed from Featured",
    };
    revalidatePath("/");
  } catch (err) {
    console.error(err);
    return { success: false, message: "Server Error" };
  }
}
