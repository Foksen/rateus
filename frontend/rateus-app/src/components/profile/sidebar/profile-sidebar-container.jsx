"use client";

import { ProfileSidebarView } from "./profile-sidebar-view";
import { BecomeOwnerAction } from "./profile-sidebar-become-owner-action";
import { patchUser } from "@/lib/api/user";
import { useRouter } from "next/navigation";

const patchUserRoleOwner = async (accessToken, userId) => {
  try {
    const result = await patchUser(accessToken, userId, {
      userRole: "OWNER",
    });
  } catch (error) {
    console.error("Failed to make client owner");
  }
};

export function ProfileSidebarContainer({ session }) {
  const router = useRouter();

  return (
    <ProfileSidebarView
      username={`${session?.user?.name} ${session?.user?.surname}`}
      useravatar={session?.user?.avatarUrl}
      role={session?.user?.role}
      becomeOwnerAction={
        session?.user?.role == "USER" && (
          <BecomeOwnerAction
            onSubmit={() => {
              patchUserRoleOwner(session?.token, session?.user?.uid);
              router.push("/oauth/callback/logout?redirect=/auth/sign-in");
            }}
          />
        )
      }
    />
  );
}
