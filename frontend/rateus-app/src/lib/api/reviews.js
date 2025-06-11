import { backendFetch } from "./fetcher";

export async function createReview(token, data) {
  return backendFetch("/api/reviews", {
    method: "POST",
    accessToken: token,
    data: data,
  });
}

export async function getOrganizationReviews(organizationId) {
  return backendFetch("/api/reviews/public", {
    method: "GET",
    params: {
      organizationId: organizationId,
    },
  });
}
