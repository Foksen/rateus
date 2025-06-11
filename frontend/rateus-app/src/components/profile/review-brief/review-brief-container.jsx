import { ProfilePageView } from "../profile-page-view";
import { ReviewBriefContent } from "./review-brief-content";

export function ReviewBriefContainer({ session, reviewBrief }) {
  return (
    <ProfilePageView
      title="Заявка на отзыв"
      content={
        <ReviewBriefContent session={session} reviewBrief={reviewBrief} />
      }
      maxW="4xl"
    />
  );
}
