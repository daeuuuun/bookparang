import { useState } from "react";
import BookInformation from "../BookInformation/BookInformation";
import Reviews from "../Reviews/Reviews";
import styles from "./BookDetailTabs.module.css";
import type { Book } from "../../types/books.ts";
import type { Review } from "../../types/review.ts";

interface Props {
  book: Book;
  reviews: Review[];
  setReviews: (reviews: Review[]) => void;
  averageRating: number;
  onAddReview: (reviewData: { rating: number; content: string }) => void;
  currentUser?: string;
}

export default function BookDetailTabs({
  book,
  reviews,
  setReviews,
  averageRating,
  onAddReview,
  currentUser = "사용자",
}: Props) {
  const [activeTab, setActiveTab] = useState<"bookInfo" | "reviews">("bookInfo");

  return (
    <div className={styles.container}>
      <div className={styles.tabHeader}>
        <div className={styles.tabHeaderInner}>
          <a
            href="#bookInfo"
            className={`${styles.tabLink} ${activeTab === "bookInfo" ? styles.active : ""}`}
            onClick={(e) => {
              e.preventDefault();
              setActiveTab("bookInfo");
            }}
          >
            도서정보
          </a>
          <a
            href="#reviews"
            className={`${styles.tabLink} ${activeTab === "reviews" ? styles.active : ""}`}
            onClick={(e) => {
              e.preventDefault();
              setActiveTab("reviews");
            }}
          >
            리뷰
          </a>
        </div>
      </div>

      <div className={styles.wrap}>
        <div className={styles.tabContent}>
          {activeTab === "bookInfo" && <BookInformation isbn={book.isbn} />}
          {activeTab === "reviews" && (
            <Reviews
              reviews={reviews}
              setReviews={setReviews}
              averageRating={averageRating}
              onAddReview={onAddReview}
              currentUser={currentUser}
            />
          )}
        </div>
      </div>
    </div>
  );
}
