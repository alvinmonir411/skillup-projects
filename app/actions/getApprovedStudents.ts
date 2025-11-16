"use server";

import clientPromise from "../lib/mongodb";
import { currentUser, clerkClient } from "@clerk/nextjs/server";
import { ObjectId } from "mongodb";

export async function getApprovedStudents() {
  try {
    const user = await currentUser();
    if (!user) throw new Error("User not authenticated");

    const teacherId = user.id;

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME || "juwelary");

    const requestCollection = db.collection("requestSession");

    // Get approved session requests for this teacher
    const approvedRequests = await requestCollection
      .find({ teacherId: teacherId, status: "approved" })
      .sort({ createdAt: -1 })
      .toArray();

    // Merge student details from Clerk
    const mergedData = await Promise.all(
      approvedRequests.map(async (req) => {
        try {
          // replacement for $SELECTION_PLACEHOLDER$
          const studentId = String(req.studentId);
          const clerk = await clerkClient();
          const student = await clerk.users.getUser(studentId);

          console.log(
            student.fullName,
            student.emailAddresses,
            student.imageUrl
          );
          return {
            ...req,
            studentDetails: {
              id: student.id,
              name: student.fullName,
              email: student.emailAddresses?.[0]?.emailAddress || "",
              picture: student.imageUrl,
            },
          };
        } catch (err) {
          console.error("Error fetching student from Clerk:", err);
          return {
            ...req,
            studentDetails: null,
          };
        }
      })
    );

    return JSON.parse(JSON.stringify(mergedData));
  } catch (error) {
    console.error("Error in getApprovedStudents:", error);
    return [];
  }
}
