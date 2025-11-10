"use server";

import { currentUser } from "@clerk/nextjs/server";

import { ObjectId } from "mongodb";
import clientPromise from "../lib/mongodb";

export async function createCourseRequest({
  courseId,
  message,
  type = "access",
}: {
  courseId: string;
  message?: string;
  type?: string;
}) {
  const user = await currentUser();
  if (!user) throw new Error("Not authenticated");

  const studentId = user.id;

  const client = await clientPromise;
  const db = client.db("juwelary");
  const courses = db.collection("courses");
  const requests = db.collection("courseRequests");

  const course = await courses.findOne({ _id: new ObjectId(courseId) });
  if (!course) throw new Error("Course not found");

  const teacherId = course.teacherId;

  const existing = await requests.findOne({
    studentId,
    courseId,
    status: "pending",
  });

  if (existing) {
    return { success: false, message: "You already have a pending request" };
  }

  const doc = {
    courseId,
    studentId,
    teacherId,
    type,
    message: message || "",
    status: "pending",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const res = await requests.insertOne(doc);
  return { success: true, insertedId: res.insertedId };
}
