import { PROFILE_COMMON_PAGE, PROFILE_PAGE } from "@/constants/profile-pages";
import { SettingsContainer } from "./settings/settings-container";
import { TasksContainer } from "./tasks/containers/tasks-container";
import { ClientTasksContainer } from "./tasks/containers/client-tasks-container";
import { WorkingTasksContainer } from "./tasks/containers/working-tasks-container";
import { UsersContainer } from "./users/users-conainter";
import { OrganizationTypesContainer } from "./organization-types/organization-types-container";
import {
  getAvailableOrganizationTypes,
  getOrganizationBrief,
  getOrganizationTypes,
  getSelfOrganization,
  getSelfOrganizationBriefs,
  getSelfOrganizations,
} from "@/lib/api/organizations";
import { OrganizationsSelfContainer } from "./organizations/organizations-container";
import { OrganizationSaveContainer } from "./organization-save/organization-save-containter";
import { OrganizationBriefsSelfContainer } from "./organization-briefs/organization-briefs-container";
import { OrganizationBriefContainer } from "./organization-brief/organization-brief-container";

export async function ProfilePageContainer({ profilePage, session }) {
  if (!Array.isArray(profilePage)) {
    return null;
  }

  if (profilePage[0] === PROFILE_PAGE.ORGANIZATION_BRIEF) {
    const id = profilePage[1];
    return (
      <OrganizationBriefContainer
        session={session}
        organizationBrief={await getOrganizationBrief(session.token, id)}
      />
    );
  }

  if (profilePage[0] === PROFILE_PAGE.ORGANIZATIONS_SELF) {
    if (profilePage[1] === "save") {
      const id = profilePage[2];
      if (id === "new") {
        return (
          <OrganizationSaveContainer
            session={session}
            initialOrganizationTypes={await getAvailableOrganizationTypes()}
          />
        );
      }
      return (
        <OrganizationSaveContainer
          session={session}
          initialOrganizationTypes={await getAvailableOrganizationTypes()}
          initialOrganization={await getSelfOrganization(session.token, id)}
        />
      );
    }

    return (
      <OrganizationsSelfContainer
        organizations={await getSelfOrganizations(session.token)}
      />
    );
  }

  if (profilePage[0] === PROFILE_PAGE.ORGANIZATION_BRIEFS_SELF) {
    return (
      <OrganizationBriefsSelfContainer
        organizationBriefs={await getSelfOrganizationBriefs(session.token)}
      />
    );
  }

  if (profilePage[0] === PROFILE_PAGE.ORGANIZATION_TYPES) {
    return (
      <OrganizationTypesContainer
        session={session}
        initialOrganizationTypes={await getOrganizationTypes()}
      />
    );
  }

  if (profilePage[0] === PROFILE_COMMON_PAGE.SETTINGS) {
    return <SettingsContainer session={session} />;
  }

  return null;
}
