import { backendFetch } from "./fetcher";

export async function registerUserWithEmail(data, requestType) {
  return backendFetch(
    "/api/back-auth/sign-up/email",
    {
      method: "POST",
      data: data,
    },
    requestType
  );
}

export async function loginWithEmail(data, requestType) {
  return backendFetch(
    "/api/back-auth/sign-in/email",
    {
      method: "POST",
      data: data,
    },
    requestType
  );
}

export async function loginWithYandex(code, requestType) {
  return backendFetch(
    "/api/back-auth/sign-in/yandex",
    {
      method: "POST",
      data: { code },
    },
    requestType
  );
}
