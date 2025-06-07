import { backendFetch } from "./fetcher";

export async function patchUser(accessToken, userId, data, requestType) {
  return backendFetch(
    `/api/users/${userId}`,
    {
      method: "PATCH",
      accessToken: accessToken,
      data: data,
    },
    requestType
  );
}
