"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ObjectId } from "mongodb"; // Import ObjectId for MongoDB lookups
import { getcloudinaryImageurl } from "../lib/getcloudinaryImageurl";
import clientPromise from "../lib/mongodb";

// Configuration constants
const COLLECTION_NAME = "courses";
const DATABASE_NAME = process.env.MONGODB_DB_NAME || "juwelary";

export default async function updateCourse(formData: FormData) {
  // Assuming you are passing the MongoDB ObjectId as 'Editcoursesid' or 'courseId'
  const courseId = formData.get("courseid") as string;
  const file = formData.get("thumbnail") as File;
  // Note: I recommend renaming 'oldThumbnail' to 'currentThumbnailUrl' in your form for clarity.
  const currentThumbnailUrl = formData.get("currentThumbnailUrl") as string;

  if (!courseId) {
    throw new Error("Course ID is missing. Cannot update.");
  }

  let imageUrl = currentThumbnailUrl;

  // Check if a new file was uploaded
  if (file && file.size > 0) {
    try {
      imageUrl = await getcloudinaryImageurl(file);
      console.log("✅ New uploaded image URL:", imageUrl);
    } catch (error) {
      console.error("❌ Cloudinary upload failed:", error);
      // Ensure the error is descriptive for the user
      throw new Error(
        "Image upload failed. Please check the file and try again."
      );
    }
  } else {
    console.log("ℹ️ No new image uploaded, keeping current URL.");
  }

  // --- 2. Extract and Prepare Update Data ---

  // Grab other form data
  const title = formData.get("title") as string;
  const category = formData.get("category") as string;
  const level = formData.get("level") as string;
  const duration = formData.get("duration") as string;
  const price = formData.get("Price");
  const language = formData.get("language") as string;
  const courseType = formData.get("classType") as string;
  const outcomes = formData.get("outcomes") as string;
  const requirements = formData.get("requirements") as string;
  const trailer = formData.get("trailer") as string;

  const teacherId = formData.get("teacherId") as string;
  const teacherName = formData.get("teacherName") as string;

  // Final course data to save
  const updatedData = {
    title,
    category,
    level,
    durationHours: Number(duration),
    price,
    language,
    courseType,
    learningOutcomes: outcomes,
    prerequisites: requirements,
    trailerUrl: trailer,
    thumbnailUrl: imageUrl, // Use the new or old URL
    teacherId,
    teacherName,
    // Add an 'updatedAt' timestamp
    updatedAt: new Date(),
  };

  // Clean up any empty strings/nulls if your schema requires it, though MongoDB is flexible
  const finalUpdate = Object.fromEntries(
    Object.entries(updatedData).filter(([, v]) => v !== null && v !== "")
  );

  console.log("🔥 Final data ready to save:", finalUpdate);

  // --- 3. MongoDB Update ---

  try {
    const client = await clientPromise;
    const db = client.db(DATABASE_NAME);
    const coursesCollection = db.collection(COLLECTION_NAME);

    // Perform the update operation
    const result = await coursesCollection.updateOne(
      { _id: new ObjectId(courseId) }, // Find the course by its MongoDB ObjectId
      { $set: finalUpdate }
    );

    if (result.matchedCount === 0) {
      console.error("❌ Course not found for ID:", courseId);
      throw new Error("Course not found or insufficient permissions.");
    }

    console.log("✅ Course updated successfully:", courseId);
  } catch (error) {
    console.error("❌ MongoDB update failed:", error);
    // Re-throw a generic error if the database operation failed
    throw new Error("Failed to save course details to the database.");
  }

  revalidatePath(`/teacherDashboard/profile/${courseId}`);
  revalidatePath(`/teacherDashboard/profile`);
  redirect(`/BrowseSkills/${courseId}`);
}
