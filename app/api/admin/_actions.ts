// ../api/admin/_actions.ts

"use server";

import clientPromise from "@/app/lib/mongodb";
import { clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

type ActionReturn = Promise<void>;

// 1. ✅ FIX: Define the COLLECTION_NAME once and guarantee it's a string.
//    (This avoids the string | null or string | undefined issue inside the functions)
const COLLECTION_NAME: string =
  process.env.NEXTAUTH_TEACHER_COLLECTION || "teacherApplications";

const ADMIN_TABLE_PATH = "/admin"; // Path to revalidate

/**
 * Sets a public role for a user (Approve Action).
 */
export async function setRole(formData: FormData): ActionReturn {
  const id = formData.get("id") as string;
  const role = formData.get("role") as string; // Expected: 'teacher'

  if (!id || !role) {
    console.error("Missing ID or Role for setRole action.");
    return;
  }

  try {
    // 1. 🚀 CLERK UPDATE (GLOBAL ROLE CHANGE)
    const clerk = await clerkClient(); // Await the function call
    await clerk.users.updateUser(id, {
      publicMetadata: {
        role: role,
      },
    });

    // 2. 💾 MONGODB UPDATE (APPLICATION STATUS CHANGE)
    const client = await clientPromise;
    // 2a. ✅ FIX: Use 'client' singular instead of 'clients'
    const db = client.db(process.env.MONGODB_DB_NAME || "juwelary");
    // 2b. ✅ FIX: Use the globally defined COLLECTION_NAME (guaranteed string)
    const applicationsCollection = db.collection(COLLECTION_NAME);

    await applicationsCollection.updateOne(
      { clerkUserId: id },
      {
        $set: {
          status: "approved", // Set status to approved
          approvedAt: new Date(),
          role: role,
        },
      }
    );

    // 3. ✅ Refresh the Admin Table
    revalidatePath(ADMIN_TABLE_PATH);
  } catch (error) {
    console.error(`Failed to set role for user ${id}:`, error);
  }
}

/**
 * Removes the custom role (Reject Action).
 */
export async function removeRole(formData: FormData): ActionReturn {
  const id = formData.get("id") as string;

  if (!id) {
    console.error("Missing ID for removeRole action.");
    return;
  }

  try {
    // 1. 🚀 CLERK UPDATE (GLOBAL ROLE CHANGE)
    const clerk = await clerkClient();
    await clerk.users.updateUser(id, {
      publicMetadata: {
        role: "user", // Set role back to basic
      },
    });

    // 2. 💾 MONGODB UPDATE (APPLICATION STATUS CHANGE)
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME || "juwelary");
    const applicationsCollection = db.collection(COLLECTION_NAME);

    // 2a. ✅ FIX: Add MongoDB update logic for rejection
    await applicationsCollection.updateOne(
      { clerkUserId: id },
      {
        $set: {
          status: "rejected", // Set status to rejected/denied
          rejectedAt: new Date(),
          role: "user",
        },
      }
    );

    // 3. ✅ Refresh the Admin Table
    revalidatePath(ADMIN_TABLE_PATH);
  } catch (error) {
    console.error(`Failed to remove role for user ${id}:`, error);
  }
}
