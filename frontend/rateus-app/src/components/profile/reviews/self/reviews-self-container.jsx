import { ProfilePageView } from "../../profile-page-view";
import { ReviewsSelfContent } from "./reviews-self-content";

export function ReviewsSelfContainer({ reviews }) {
  return (
    <ProfilePageView
      title="Ваши отзывы"
      description="На этой странице собрана информация о ваших отзывах"
      content={<ReviewsSelfContent reviews={reviews} />}
    />
  );
}
