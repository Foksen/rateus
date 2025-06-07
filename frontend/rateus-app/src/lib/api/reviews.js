import { backendFetch } from "./fetcher";

export async function createReview(token, data, requestType) {
  return backendFetch(
    "/api/reviews",
    {
      method: "POST",
      accessToken: token,
      data: data,
    },
    requestType
  );
}
