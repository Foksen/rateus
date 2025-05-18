"use client";

import { loginWithYandex } from "@/lib/api/auth";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, Fragment } from "react";

export default function YandexCallback() {
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    const code = params.get("code");
    if (!code) {
      console.error("Didn't get authorization code from yandex");
      router.replace("/auth/sign-in");
      return;
    }

    async function sendCode() {
      try {
        const response = await loginWithYandex(code);
        await signIn("credentials", {
          token: response.token,
          redirect: false,
        });
        router.push("/");
      } catch (e) {
        console.error("Authorization with yandex failed", e);
        router.push("/auth/sign-in");
      }
    }

    sendCode();
  }, [params, router]);

  return <Fragment />;
}
