"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs"; // or your auth provider

const RoleRedirect = () => {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return; // wait until user loads

    if (!user) {
      router.push("/sign-in");
      return;
    }

    const role = user.publicMetadata.role;

    switch (role) {
      case "admin":
        router.push("/admin");
        break;
      case "moderator":
        router.push("/moderator");
        break;
      case "teacher":
        router.push("/teacher");
        break;
      case "user":
        router.push("/user");
        break;
      default:
        router.push("/"); // fallback
    }
  }, [user, isLoaded, router]);

  return <div>Redirecting based on your role...</div>;
};

export default RoleRedirect;
