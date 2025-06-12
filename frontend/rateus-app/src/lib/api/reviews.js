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

export async function getReviews(token) {
  return backendFetch("/api/reviews", {
    method: "GET",
    accessToken: token,
  });
}

export async function getSelfReviews(token) {
  return backendFetch("/api/reviews/self", {
    method: "GET",
    accessToken: token,
  });
}

export async function getReviewBriefs(token) {
  return backendFetch("/api/briefs/reviews", {
    method: "GET",
    accessToken: token,
  });
}

export async function getReviewBrief(token, id) {
  return backendFetch(`/api/briefs/reviews/${id}`, {
    method: "GET",
    accessToken: token,
  });
}

export async function getSelfReviewBriefs(token) {
  return backendFetch("/api/briefs/reviews/self", {
    method: "GET",
    accessToken: token,
  });
}

export async function updateReviewBriefStatus(token, id, status) {
  return backendFetch(`/api/briefs/reviews/${id}/${status}`, {
    method: "PATCH",
    accessToken: token,
  });
}
