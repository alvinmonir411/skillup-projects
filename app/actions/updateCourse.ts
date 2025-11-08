"use server";

import { getcloudinaryImageurl } from "../lib/getcloudinaryImageurl";

export default async function updateCourse(update: FormData) {
  const file = update.get("thumbnail") as File;

  let imageUrl = "";
  try {
    imageUrl = await getcloudinaryImageurl(file);
    console.log("✅ Uploaded Image URL:", imageUrl);
  } catch (error) {
    console.error("❌ Cloudinary Upload Failed:", error);
    throw new Error("Image upload failed");
  }
  console.log("update image url", imageUrl);
}
