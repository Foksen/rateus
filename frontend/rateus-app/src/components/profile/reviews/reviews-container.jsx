import { ProfilePageView } from "../profile-page-view";
import { ReviewsContent } from "./reviews-content";

export function ReviewsContainer({ reviews }) {
  return (
    <ProfilePageView
      title="Ваши отзывы"
      description="На этой странице собрана информация о ваших отзывах"
      content={<ReviewsContent reviews={reviews} />}
    />
  );
}
