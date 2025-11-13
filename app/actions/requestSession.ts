
"use server";

import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import clientPromise from "../lib/mongodb";
import { ObjectId } from "mongodb"; 


interface RequestData {
  courseId: string | ObjectId; 
  teacherId: string;
  type: "access" | "support" | "custom";
  message: string;
}

export async function requestSession(formData: RequestData) {
  const user = await currentUser();


  if (!user) {
    throw new Error("Authorization Required: User must be logged in.");
  }

  
  const docToInsert = {
    
    ...formData,


    studentId: user.id, 
    status: "pending" as const, 
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME || "juwelary");
    const applicationsCollection = db.collection("requestSession");

    const result = await applicationsCollection.insertOne(docToInsert);

    
    revalidatePath("/userdashboard/myrequest"); 

    return { success: true, insertedId: result.insertedId.toString() };
  } catch (error) {
    console.error("MongoDB Insertion Error:", error);
    throw new Error("Failed to submit request to database.");
  }
}
