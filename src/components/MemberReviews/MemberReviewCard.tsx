import StarRating from "../StarRating/StarRating";
import styles from "./MemberReviews.module.css";

interface MemberReview {
  id: string;
  title: string;
  author: string;
  img: string;
  ment: string;
  reviewerName: string;
  reviewerImg: string;
  rating: number; // ✅ 1~10 (소수점 0.5 단위)
}

interface MemberReviewProps {
  review: MemberReview;
}

export default function MemberReviewCard({ review }: MemberReviewProps) {
  return (
    <div className={styles.card}>
      <div className={styles.cardInner}>
        {/* 왼쪽 영역 */}
        <div className={styles.infoBox}>
          <img src={review.img} alt={review.title} className={styles.bookImg} />
          <p className={styles.title}>{review.title}</p>
          <p className={styles.author}>{review.author}</p>
        </div>

        {/* 오른쪽 영역 */}
        <div className={styles.rightSection}>
          <StarRating rating={review.rating / 2} />
          <hr className={styles.mentLine} />
          <p className={styles.ment}>{review.ment}</p>
        </div>
      </div>

      {/* 아래 리뷰 영역 */}
      <div className={styles.profile}>
        <p className={styles.profileName}>{review.reviewerName}님의 리뷰</p>
        <img
          src={review.reviewerImg}
          alt={review.reviewerName}
          className={styles.profileImg}
        />
        <div className={styles.bubbleDots}>
          <span className={styles.topBubble}></span>
          <span className={styles.bottomBubble}></span>
        </div>
      </div>
    </div>
  );
}
