"use client";

import { signOut, useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

function LogoutCallbackInner() {
  const { status } = useSession();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  useEffect(() => {
    if (status === "authenticated") {
      signOut({ redirect: false });
    } else if (status === "unauthenticated") {
      window.location.href = redirectTo;
    }
  }, [status, redirectTo]);
}

export default function LogoutCallback() {
  return (
    <Suspense>
      <LogoutCallbackInner />
    </Suspense>
  );
}
