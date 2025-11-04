"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import DashboardLoading from "../utils/Loading";

const RoleRedirect = () => {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  console.log(user);
  useEffect(() => {
    if (!isLoaded) return;
    if (!user) {
      router.push("/sign-in");
      return;
    }

    const role = user.publicMetadata.role;

    switch (role) {
      case "admin":
        router.push("/admindashboard");
        break;
      case "moderator":
        router.push("/moderator");
        break;
      case "teacher":
        router.push("/teacherDashboard");
        break;
      default:
        router.push("/userdashboard");
    }
  }, [user, isLoaded, router]);

  return (
    <div>
      {" "}
      <DashboardLoading />{" "}
    </div>
  );
};

export default RoleRedirect;
