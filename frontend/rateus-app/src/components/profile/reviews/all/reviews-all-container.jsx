import { ProfilePageView } from "../../profile-page-view";
import { ReviewsAllContent } from "./reviews-all-content";

export function ReviewsAllContainer({ reviews }) {
  return (
    <ProfilePageView
      title="Все отзывы"
      description="На этой странице собрана информация обо всех отзывах"
      content={<ReviewsAllContent reviews={reviews} />}
    />
  );
}
