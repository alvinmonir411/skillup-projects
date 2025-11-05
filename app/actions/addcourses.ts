"use server";

import { getcloudinaryImageurl } from "../lib/getcloudinaryImageurl";
import clientPromise from "../lib/mongodb";

const COLLECTION_NAME = "courses";
const DATABASE_NAME = process.env.MONGODB_DB_NAME || "juwelary";

export async function addcourses(formData: FormData) {
  const file = formData.get("thumbnail") as File;

  // ✅ Validate file first
  if (!(file instanceof File) || file.size === 0) {
    console.error("Missing or invalid thumbnail file.");
    throw new Error("Thumbnail is required.");
  }

  // ✅ Upload image to Cloudinary
  let imageUrl = "";
  try {
    imageUrl = await getcloudinaryImageurl(file);
    console.log("✅ Uploaded Image URL:", imageUrl);
  } catch (error) {
    console.error("❌ Cloudinary Upload Failed:", error);
    throw new Error("Image upload failed");
  }

  // ✅ Extract form values
  const teacherId = formData.get("teacherId") as string;
  const title = formData.get("title") as string;
  const category = formData.get("category") as string;
  const level = formData.get("level") as string;
  const duration = parseInt(formData.get("duration") as string, 10);
  const language = formData.get("language") as string;
  const courseType = formData.get("classType") as string;
  const outcomes = formData.get("outcomes") as string;
  const requirements = formData.get("requirements") as string;
  const trailerUrl = (formData.get("trailer") as string) || "";

  // ✅ Quick validation
  if (!teacherId || !title || !category || duration <= 0) {
    console.error("❌ Missing critical course details");
    throw new Error("Course data invalid");
  }

  // ✅ Insert to MongoDB
  try {
    const client = await clientPromise;
    const db = client.db(DATABASE_NAME);
    const coursesCollection = db.collection(COLLECTION_NAME);

    const newCourse = {
      teacherId,
      title,
      thumbnailUrl: imageUrl,
      category,
      level,
      durationHours: duration,
      language,
      courseType,
      learningOutcomes: outcomes,
      prerequisites: requirements,
      trailerUrl,
      status: "pending",
      createdAt: new Date(),
    };

    const result = await coursesCollection.insertOne(newCourse);
    console.log("✅ Course inserted:", result.insertedId);
  } catch (error) {
    console.error("❌ DB insert failed:", error);
    throw new Error("Database error");
  }
}
