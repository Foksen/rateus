import { backendFetch } from "./fetcher";

export async function patchUser(accessToken, userId, data) {
  return backendFetch(`/api/users/${userId}`, {
    method: "PATCH",
    accessToken: accessToken,
    data: data,
  });
}
