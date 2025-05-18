import { backendFetch } from "./fetcher";

export async function registerUserWithEmail(data) {
  return backendFetch("/api/auth/sign-up/email", {
    method: "POST",
    data: data,
  });
}

export async function loginUser(email, password, code) {
  const data = { email, password };
  if (code) {
    data.code = code;
  }
  return backendFetch("/api/users/login/", {
    method: "POST",
    data: data,
  });
}

export async function loginWithEmail(data) {
  return backendFetch("/api/auth/sign-in/email", {
    method: "POST",
    data: data,
  });
}

export async function loginWithYandex(code) {
  return backendFetch("/api/auth/sign-in/yandex", {
    method: "POST",
    data: { code },
  });
}
