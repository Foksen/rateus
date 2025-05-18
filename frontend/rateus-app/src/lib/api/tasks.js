import { backendFetch } from "./fetcher";

export async function createReview(token, data) {
  return backendFetch("/api/organizations/reviews", {
    method: "POST",
    accessToken: token,
    data: data,
  });
}
