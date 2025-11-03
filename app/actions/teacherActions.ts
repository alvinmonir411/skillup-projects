// actions/teacherActions.ts
"use server";

import { redirect } from "next/navigation";
import clientPromise from "../lib/mongodb";

const COLLECTION_NAME =
  process.env.NEXTAUTH_TEACHER_COLLECTION || "teacherApplications";

export async function applyForTeacher(formData: FormData) {
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
      // userEmail: user.emailAddresses[0].emailAddress, // user object লোড না করলে এটি কাজ করবে না
    };

    await applicationsCollection.insertOne(applicationDoc);

    redirect("/");
  } catch (error) {
    console.error("MongoDB/DB Error in applyForTeacher:", error);
    redirect("/");
  }
}
