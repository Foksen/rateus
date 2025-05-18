import { backendFetch } from "./fetcher";

export async function getOrganizationTypes() {
  return backendFetch("/api/organizations/types", {
    method: "GET",
  });
}

export async function getAvailableOrganizationTypes() {
  return backendFetch("/api/organizations/types/available", {
    method: "GET",
  });
}

export async function createOrganizationType(token, data) {
  return backendFetch("/api/organizations/types", {
    method: "POST",
    accessToken: token,
    data: data,
  });
}

export async function deleteOrganizationType(token, id) {
  return backendFetch(`/api/organizations/types/${id}`, {
    method: "DELETE",
    accessToken: token,
  });
}

export async function createOrganization(token, data) {
  return backendFetch("/api/organizations", {
    method: "POST",
    accessToken: token,
    data: data,
  });
}

export async function updateOrganization(token, id, data) {
  return backendFetch(`/api/organizations/${id}`, {
    method: "PUT",
    accessToken: token,
    data: data,
  });
}

export async function getSelfOrganizations(token) {
  return backendFetch("/api/organizations/self", {
    method: "GET",
    accessToken: token,
  });
}

export async function getSelfOrganization(token, id) {
  return backendFetch(`/api/organizations/self/${id}`, {
    method: "GET",
    accessToken: token,
  });
}

export async function getPublicOrganizations(params) {
  return backendFetch("/api/organizations/public", {
    method: "GET",
    params: params,
  });
}

export async function getPublicOrganization(id) {
  return backendFetch(`/api/organizations/public/${id}`, {
    method: "GET",
  });
}