import { backendFetch } from "./fetcher";

export async function getOrganizationTypes(requestType) {
  return backendFetch(
    "/api/organizations/types",
    {
      method: "GET",
    },
    requestType
  );
}

export async function getAvailableOrganizationTypes(requestType) {
  return backendFetch(
    "/api/organizations/types/available",
    {
      method: "GET",
    },
    requestType
  );
}

export async function createOrganizationType(token, data, requestType) {
  return backendFetch(
    "/api/organizations/types",
    {
      method: "POST",
      accessToken: token,
      data: data,
    },
    requestType
  );
}

export async function deleteOrganizationType(token, id, requestType) {
  return backendFetch(
    `/api/organizations/types/${id}`,
    {
      method: "DELETE",
      accessToken: token,
    },
    requestType
  );
}

export async function createOrganization(token, data, requestType) {
  return backendFetch(
    "/api/organizations",
    {
      method: "POST",
      accessToken: token,
      data: data,
    },
    requestType
  );
}

export async function updateOrganization(token, id, data, requestType) {
  return backendFetch(
    `/api/organizations/${id}`,
    {
      method: "PUT",
      accessToken: token,
      data: data,
    },
    requestType
  );
}

export async function getSelfOrganizations(token, requestType) {
  return backendFetch(
    "/api/organizations/self",
    {
      method: "GET",
      accessToken: token,
    },
    requestType
  );
}

export async function getSelfOrganization(token, id, requestType) {
  return backendFetch(
    `/api/organizations/self/${id}`,
    {
      method: "GET",
      accessToken: token,
    },
    requestType
  );
}

export async function getPublicOrganizations(params, requestType) {
  return backendFetch(
    "/api/organizations/public",
    {
      method: "GET",
      params: params,
    },
    requestType
  );
}

export async function getPublicOrganization(id, requestType) {
  return backendFetch(
    `/api/organizations/public/${id}`,
    {
      method: "GET",
    },
    requestType
  );
}
