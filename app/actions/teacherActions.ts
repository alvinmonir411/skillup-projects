// actions/teacherActions.ts
"use server";

import { redirect } from "next/navigation";
import clientPromise from "../lib/mongodb";

import { currentUser } from "@clerk/nextjs/server";

const COLLECTION_NAME =
  process.env.NEXTAUTH_TEACHER_COLLECTION || "teacherApplications";

export async function applyForTeacher(formData: FormData) {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  // --- Form Data Extraction (omitted for brevity) ---
  const fullName = formData.get("fullName")?.toString() || "";
  const subject = formData.get("subject")?.toString() || "";
  const bio = formData.get("bio")?.toString() || "";
  const experience = formData.get("experience")?.toString() || "";
  const level = formData.get("level")?.toString() || "";
  const links = formData.get("links")?.toString() || null;
  const availability = formData.get("availability")?.toString() || "";
  const promise = formData.get("promise") === "on";

  if (
    !fullName ||
    !subject ||
    !experience ||
    !level ||
    !availability ||
    !promise
  ) {
    redirect("/userdashboard/maketeacher?error=MissingRequiredFields");
  }

  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME || "juwelary");
    const applicationsCollection = db.collection(COLLECTION_NAME);

    const existingApplication = await applicationsCollection.findOne({
      clerkUserId: user.id,
    });

    if (existingApplication) {
      console.log(
        `User ${user.id} attempted to submit a duplicate application.`
      );

      redirect("/userdashboard?error=ApplicationAlreadySubmitted");
    }

    const userEmail = user.emailAddresses[0].emailAddress;

    const applicationDoc = {
      fullName,
      subject,
      bio,
      experience,
      level,
      links,
      availability,
      promise,
      status: "pending",
      createdAt: new Date(),
      clerkUserId: user.id,
      userEmail: userEmail,
    };

    await applicationsCollection.insertOne(applicationDoc);

    // Redirect on successful first submission
    redirect("/");
  } catch (error) {
    console.error("MongoDB/DB Error in applyForTeacher:", error);
    // General error redirect
    redirect("/");
  }
}
