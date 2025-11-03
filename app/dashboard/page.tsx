"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

const RoleRedirect = () => {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;
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
      default:
        router.push("/userdashboard");
    }
  }, [user, isLoaded, router]);

  return <div>Redirecting based on your role...</div>;
};

export default RoleRedirect;
