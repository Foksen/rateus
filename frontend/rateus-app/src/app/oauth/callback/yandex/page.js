"use client";

import { loginWithYandex } from "@/lib/api/back-auth";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

function YandexCallbackInner() {
  const params = useSearchParams();

  useEffect(() => {
    const code = params.get("code");
    if (!code) {
      console.error("Didn't get authorization code from yandex");
      window.location.href = "/auth/sign-in";
    }

    async function sendCode() {
      try {
        const response = await loginWithYandex(code);
        await signIn("credentials", {
          token: response.token,
          redirect: false,
        });
        window.location.href = "/";
      } catch (e) {
        console.error("Authorization with yandex failed", e);
        window.location.href = "/auth/sign-in";
      }
    }

    sendCode();
  }, [params]);
}

export default function YandexCallback() {
  return (
    <Suspense>
      <YandexCallbackInner />
    </Suspense>
  );
}
