"use client";

import { ProfilePageView } from "../profile-page-view";
import { OrganizationTypesContent } from "./organization-types-content";

export function OrganizationTypesContainer({
  initialOrganizationTypes,
  session,
}) {
  return (
    <ProfilePageView
      title="Типы организаций"
      description="На этой страницы собрана информация о существующих типах организаций"
      content={
        <OrganizationTypesContent
          initialOrganizationTypes={initialOrganizationTypes}
          session={session}
        />
      }
      maxW="5xl"
    />
  );
}
