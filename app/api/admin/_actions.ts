// ../api/admin/_actions.ts

"use server";

import { clerkClient } from "@clerk/nextjs/server"; // This returns a Promise<ClerkClient>
import { revalidatePath } from "next/cache";

type ActionReturn = Promise<void>;

/**
 * Sets a public role for a user.
 */
export async function setRole(formData: FormData): ActionReturn {
  const id = formData.get("id") as string;
  const role = formData.get("role") as string;

  if (!id || !role) {
    console.error("Missing ID or Role for setRole action.");
    return;
  }

  try {
    // 🎯 FIX: Await clerkClient() to get the actual client object
    const client = await clerkClient();

    await client.users.updateUser(id, {
      // ✅ Now 'client.users' is available
      publicMetadata: {
        role: role,
      },
    });

    revalidatePath("/admin");
  } catch (error) {
    console.error(`Failed to set role for user ${id}:`, error);
  }
}

/**
 * Removes the custom role.
 */
export async function removeRole(formData: FormData): ActionReturn {
  const id = formData.get("id") as string;

  if (!id) {
    console.error("Missing ID for removeRole action.");
    return;
  }

  try {
    // 🎯 FIX: Await clerkClient() to get the actual client object
    const client = await clerkClient();

    await client.users.updateUser(id, {
      // ✅ Now 'client.users' is available
      publicMetadata: {
        role: "basic",
      },
    });

    revalidatePath("/admin");
  } catch (error) {
    console.error(`Failed to remove role for user ${id}:`, error);
  }
}
