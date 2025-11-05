import styles from "./BookRow.module.css";
import { ReactComponent as StarIcon } from "../BookRow/star.svg";
import { ReactComponent as FireIcon } from "../BookRow/fire.svg";
import { ReactComponent as HeartIcon } from "../BookRow/heart.svg";
import { ReactComponent as ClickHeartIcon } from "../BookRow/clickheart.svg";
import type { Book } from "../../types/books";

interface Props {
  book: Book;
  rank?: number;
  showRank?: boolean; // ✅ 추가
  isFavorited: boolean;
  reviewAverage?: number;
  onFavorite: (isbn: string) => void;
  onAddCart: (isbn: string) => void;
  onClick?: () => void;
}

export default function BookRow({
  book,
  rank,
  showRank = true, // ✅ 기본값 true → 베스트셀러는 그대로
  isFavorited,
  reviewAverage,
  onFavorite,
  onAddCart,
  onClick,
}: Props) {
  return (
    <div className={styles.row} onClick={onClick}>
      {showRank ? (
        <h2 className={styles.number}>{rank ?? 1}</h2> // ✅ 숫자 보임
      ) : (
        <div className={styles.numberPlaceholder}></div> // ✅ 공간만 유지
      )}

      <div
        className={styles.imageWrapper}
        style={{ ["--bg" as unknown as string]: `url(${book.image})` }}
      >
        <img src={book.image} alt={book.title} className={styles.image} />
      </div>

      <div className={styles.info}>
        <h4 className={styles.title}>{book.title}</h4>

        <div className={styles.list}>
          <p className={styles.author}>{book.author}</p>
          <p className={styles.publisher}>{book.publisher}</p>
          <p className={styles.publishDate}>{book.pubDate}</p>
        </div>

        <div className={styles.price}>
          {book.salePrice?.toLocaleString()}원
          {book.listPrice && (
            <p className={styles.discount}>
              {book.listPrice.toLocaleString()}원
            </p>
          )}
          {book.discountRate && book.discountRate > 0 && (
            <p className={styles.percent}>({book.discountRate}% 할인)</p>
          )}
        </div>

        <div className={styles.review}>
          <StarIcon className={styles.starIcon} />
          {reviewAverage ?? book.rating ?? "평점 없음"}
        </div>

        {book.comment && (
          <div className={styles.ment}>
            <FireIcon className={styles.fireIcon} />
            <p className={styles.comment}>{book.comment}</p>
          </div>
        )}
      </div>

      <div className={styles.button}>
        <button
          className={styles.cart}
          onClick={(e) => {
            e.stopPropagation();
            onAddCart(book.isbn);
          }}
        >
          장바구니
        </button>

        <button className={styles.buy}>바로구매</button>

        <button
          className={styles.heart}
          onClick={(e) => {
            e.stopPropagation();
            onFavorite(book.isbn);
          }}
          aria-pressed={isFavorited}
          aria-label={isFavorited ? "찜 취소" : "찜하기"}
        >
          {isFavorited ? (
            <ClickHeartIcon className={styles.heartIcon} />
          ) : (
            <HeartIcon className={styles.heartIcon} />
          )}
        </button>
      </div>
    </div>
  );
}
