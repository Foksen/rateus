import { backendFetch } from "./fetcher";

export async function patchUser(accessToken, userId, data) {
  return backendFetch(`/api/users/${userId}`, {
    method: "PATCH",
    accessToken: accessToken,
    data: data,
  });
}

export async function getUsers(token) {
  return backendFetch("/api/users", {
    method: "GET",
    accessToken: token,
  });
}

export async function deleteUser(token, id) {
  return backendFetch(`/api/users/${id}`, {
    method: "DELETE",
    accessToken: token,
  });
}
