// actions/homeDataActions.ts (Server Utility)

import clientPromise from "@/app/lib/mongodb";

const COLLECTION_NAME = "courses";
const DATABASE_NAME = process.env.MONGODB_DB_NAME || "juwelary";

/**
 * Fetches courses marked as featured for the homepage display.
 */
export async function getFeaturedCourses() {
  try {
    const client = await clientPromise;
    const db = client.db(DATABASE_NAME);
    const coursesCollection = db.collection(COLLECTION_NAME);

    // Fetch courses where isFeatured is true, and limit the result (e.g., to 8 courses)
    const featured = await coursesCollection
      .find({ isFeatured: true })
      .limit(8)
      .toArray();

    return featured;
  } catch (error) {
    console.error("Error fetching featured courses:", error);
    // In case of an error, return an empty array gracefully
    return [];
  }
}
