import { PROFILE_COMMON_PAGE, PROFILE_PAGE } from "@/constants/profile-pages";
import { SettingsContainer } from "./settings/settings-container";
import { TasksContainer } from "./tasks/containers/tasks-container";
import { ClientTasksContainer } from "./tasks/containers/client-tasks-container";
import { WorkingTasksContainer } from "./tasks/containers/working-tasks-container";
import { UsersContainer } from "./users/users-conainter";
import { OrganizationTypesContainer } from "./organization-types/organization-types-container";
import {
  getAvailableOrganizationTypes,
  getOrganizationTypes,
  getSelfOrganization,
  getSelfOrganizations,
} from "@/lib/api/organizations";
import { OrganizationsSelfContainer } from "./organizations-self/organizations-self-container";
import { OrganizationSaveContainer } from "./organization-save/organization-save-containter";
import { REQUEST_TYPE } from "@/constants/request-type";

export async function ProfilePageContainer({ profilePage, session }) {
  if (!Array.isArray(profilePage)) {
    return null;
  }

  if (profilePage[0] === PROFILE_PAGE.ORGANIZATIONS_SELF) {
    if (profilePage[1] === "save") {
      const id = profilePage[2];
      if (id === "new") {
        return (
          <OrganizationSaveContainer
            session={session}
            initialOrganizationTypes={await getAvailableOrganizationTypes(
              REQUEST_TYPE.SSR
            )}
          />
        );
      }
      return (
        <OrganizationSaveContainer
          session={session}
          initialOrganizationTypes={await getAvailableOrganizationTypes(
            REQUEST_TYPE.SSR
          )}
          initialOrganization={await getSelfOrganization(
            session.token,
            id,
            REQUEST_TYPE.SSR
          )}
        />
      );
    }

    return (
      <OrganizationsSelfContainer
        organizations={
          (await getSelfOrganizations(session.token, REQUEST_TYPE.SSR))
            .organizations
        }
      />
    );
  }

  if (profilePage[0] === PROFILE_PAGE.ORGANIZATION_TYPES) {
    return (
      <OrganizationTypesContainer
        session={session}
        initialOrganizationTypes={await getOrganizationTypes(REQUEST_TYPE.SSR)}
      />
    );
  }

  if (profilePage[0] === PROFILE_COMMON_PAGE.SETTINGS) {
    return <SettingsContainer session={session} />;
  }

  return null;
}
