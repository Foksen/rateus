import { PROFILE_COMMON_PAGE, PROFILE_PAGE } from "@/constants/profile-pages";
import { SettingsContainer } from "./settings/settings-container";
import { UsersContainer } from "./users/users-conainter";
import { OrganizationTypesContainer } from "./organization-types/organization-types-container";
import {
  getAvailableOrganizationTypes,
  getOrganizationBrief,
  getOrganizationBriefs,
  getOrganizations,
  getOrganizationTypes,
  getSelfOrganization,
  getSelfOrganizationBriefs,
  getSelfOrganizations,
} from "@/lib/api/organizations";
import { OrganizationsSelfContainer } from "./organizations/self/organizations-self-container";
import { OrganizationSaveContainer } from "./organization-save/organization-save-containter";
import { OrganizationBriefsContainer } from "./organization-briefs/organization-briefs-container";
import { OrganizationBriefContainer } from "./organization-brief/organization-brief-container";
import { ReviewsSelfContainer } from "./reviews/self/reviews-self-container";
import {
  getReviewBrief,
  getSelfReviewBriefs,
  getSelfReviews,
} from "@/lib/api/reviews";
import { ReviewBriefsContainer } from "./review-briefs/review-briefs-container";
import { ReviewBriefContainer } from "./review-brief/review-brief-container";
import { getUsers } from "@/lib/api/user";
import { OrganizationsAllContainer } from "./organizations/all/organizations-all-container";

export async function ProfilePageContainer({ profilePage, session }) {
  if (!Array.isArray(profilePage)) {
    return null;
  }

  if (profilePage[0] === PROFILE_PAGE.ORGANIZATIONS) {
    return (
      <OrganizationsAllContainer
        organizations={await getOrganizations(session.token)}
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

  if (profilePage[0] === PROFILE_PAGE.ORGANIZATION_BRIEF) {
    const id = profilePage[1];
    return (
      <OrganizationBriefContainer
        session={session}
        organizationBrief={await getOrganizationBrief(session.token, id)}
      />
    );
  }

  if (profilePage[0] === PROFILE_PAGE.ORGANIZATION_BRIEFS) {
    return (
      <OrganizationBriefsContainer
        organizationBriefs={await getOrganizationBriefs(session.token)}
      />
    );
  }

  if (profilePage[0] === PROFILE_PAGE.ORGANIZATION_BRIEFS_SELF) {
    return (
      <OrganizationBriefsContainer
        organizationBriefs={await getSelfOrganizationBriefs(session.token)}
      />
    );
  }

  if (profilePage[0] === PROFILE_PAGE.REVIEWS_SELF) {
    return (
      <ReviewsSelfContainer reviews={await getSelfReviews(session.token)} />
    );
  }

  if (profilePage[0] === PROFILE_PAGE.REVIEW_BRIEF) {
    const id = profilePage[1];
    return (
      <ReviewBriefContainer
        session={session}
        reviewBrief={await getReviewBrief(session.token, id)}
      />
    );
  }

  if (profilePage[0] === PROFILE_PAGE.REVIEW_BRIEFS_SELF) {
    return (
      <ReviewBriefsContainer
        reviewBriefs={await getSelfReviewBriefs(session.token)}
      />
    );
  }

  if (profilePage[0] === PROFILE_PAGE.USERS) {
    return (
      <UsersContainer
        initialUsers={await getUsers(session.token)}
        session={session}
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
