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

const fetchTasks = async (session) => {
  try {
    const result = await getTasks(session.accessToken);
    return result.results;
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};

const fetchMasterTasks = async (session) => {
  try {
    const masterId = session?.user?.id;
    if (!masterId) {
      throw new Error("Cannot get master id from session");
    }
    const result = await getTasks(session.accessToken, { master: masterId });
    return result.results;
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};

const fetchCategories = async (filters) => {
  try {
    const result = await getCategories(filters);
    return result.results;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

const fetchServiceCenters = async (filters) => {
  try {
    const result = await getServiceCenters(filters);
    return result.results;
  } catch (error) {
    console.error("Error fetching service centers:", error);
  }
};

// const fetchOrganizationTypes = async (session) => {
//   try {
//     const result = await getCategoriesInfos(session.accessToken);
//     return result.results;
//   } catch (error) {
//     console.error("Error fetching categories infos: ", error);
//   }
// };

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
            initialOrganizationTypes={
              (await getAvailableOrganizationTypes()).organizationTypes
            }
          />
        );
      }
      return (
        <OrganizationSaveContainer
          session={session}
          initialOrganizationTypes={
            (await getAvailableOrganizationTypes()).organizationTypes
          }
          initialOrganization={await getSelfOrganization(session.token, id)}
        />
      );
    }

    return (
      <OrganizationsSelfContainer
        organizations={
          (await getSelfOrganizations(session.token)).organizations
        }
      />
    );
  }

  if (profilePage[0] === PROFILE_PAGE.ORGANIZATION_TYPES) {
    return (
      <OrganizationTypesContainer
        session={session}
        initialOrganizationTypes={
          (await getOrganizationTypes()).organizationTypes
        }
      />
    );
  }

  if (profilePage[0] === PROFILE_COMMON_PAGE.SETTINGS) {
    return <SettingsContainer session={session} />;
  }

  return null;
}
