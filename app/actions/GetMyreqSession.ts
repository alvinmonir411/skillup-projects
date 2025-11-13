"use server";

import clientPromise from "../lib/mongodb";
import { ObjectId } from "mongodb";
import { currentUser } from "@clerk/nextjs/server";

export async function GetMyreqSession() {
  try {
    const user = await currentUser();
    if (!user) throw new Error("User not authenticated");

    const id = user.id;
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME || "juwelary");

    const requestCollection = db.collection("requestSession");
    const courseCollection = db.collection("courses");

    // Get all user requests
    const requests = await requestCollection
      .find({ studentId: id })
      .sort({ createdAt: -1 })
      .toArray();

    // Merge each request with its course details
    const mergedRequests = await Promise.all(
      requests.map(async (req) => {
        try {
          // ensure valid ObjectId before lookup
          const course = await courseCollection.findOne({
            _id: new ObjectId(req.courseId),
          });

          return {
            ...req,
            courseDetails: course
              ? {
                  _id: course._id,
                  title: course.title,
                  thumbnailUrl: course.thumbnailUrl,
                  teacherName: course.teacherName,
                  category: course.category,
                  level: course.level,
                  durationHours: course.durationHours,
                  price: course.price,
                  language: course.language,
                  courseType: course.courseType,
                }
              : null,
          };
        } catch (err) {
          console.error("Error fetching course for request:", err);
          return { ...req, courseDetails: null };
        }
      })
    );
    console.log(mergedRequests);

    // Next.js Server Components need JSON-serializable data
    return JSON.parse(JSON.stringify(mergedRequests));
  } catch (error) {
    console.error("Error in GetMyreqSession:", error);
    return [];
  }
}
