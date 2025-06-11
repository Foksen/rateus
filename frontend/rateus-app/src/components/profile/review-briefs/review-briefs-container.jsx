import { ProfilePageView } from "../profile-page-view";
import { ReviewBriefsContent } from "./review-briefs-content";

export function ReviewBriefsContainer({ reviewBriefs }) {
  return (
    <ProfilePageView
      title="Ваши заявки на отзывы"
      description="На этой странице собрана информация о ваших заявках на отзывы"
      content={<ReviewBriefsContent reviewBriefs={reviewBriefs} />}
    />
  );
}
