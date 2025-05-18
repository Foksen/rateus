"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

function LogoutCallbackInner() {
  const { status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  useEffect(() => {
    if (status === "authenticated") {
      signOut({ redirect: false });
    } else if (status === "unauthenticated") {
      router.replace(redirectTo);
    }
  }, [status, router]);
}

export default function LogoutCallback() {
  return (
    <Suspense>
      <LogoutCallbackInner />
    </Suspense>
  );
}
