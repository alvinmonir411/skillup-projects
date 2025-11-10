// /app/actions/deletCourses.ts
"use server";

import { revalidatePath } from "next/cache";

/**
 * Handles the secure deletion of a course from the database.
 * @param courseId The ID of the course to delete.
 * @returns An object indicating success or failure.
 */
export async function deletCourses(courseId: string) {
  if (!courseId) {
    return { success: false, message: "Course ID is missing." };
  }

  try {
    // 1. **Replace this with your actual database deletion logic (e.g., MongoDB, Prisma, etc.)**
    console.log(
      `[SERVER ACTION] Attempting to delete course with ID: ${courseId}`
    );

    // Simulate a database operation delay
    // await new Promise(resolve => setTimeout(resolve, 1500));

    // 2. **Crucial: Revalidate the cache to update the UI immediately**
    // This assumes your course list is displayed at the /teacherDashboard route.
    revalidatePath("/teacherDashboard");

    return {
      success: true,
      message: `Course ${courseId} successfully deleted.`,
    };
  } catch (error) {
    console.error("Database deletion error:", error);
    return {
      success: false,
      message: "Failed to delete course due to a server error.",
    };
  }
}
