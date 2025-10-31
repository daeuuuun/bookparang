import { useState } from "react";
import type { Book } from "../../data/books";
import styles from "./NewBookRow.module.css";
import { ReactComponent as StarIcon} from "../BookRow/star.svg"; 
import { ReactComponent as HeartIcon } from "../BookRow/heart.svg";
import { ReactComponent as ClickHeartIcon } from "../BookRow/clickheart.svg";
interface Props {
  book: Book;
  rank?: number;
}

export default function NewBookRow({ book, rank }: Props) {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => setLiked((v) => !v);

  return (
    <div className={styles.row}>
        <img src={book.image} alt={book.title} className={styles.image} />
        <div className={styles.info}>
            <h4 className={styles.title}>{book.title}</h4>
            <div className={styles.list}>
                <p className={styles.author}>{book.author}</p>
                <p className={styles.publisher}>{book.publisher}</p>
                <p className={styles.publishDate}>{book.publishDate}</p>
            </div>
            <div className={styles.price}>{book.price}
                <p className={styles.discount}>{book.discount}</p>
                <p className={styles.percent}>{book.percent}</p>
            </div>
            <div className={styles.review}>
            <StarIcon className={styles.starIcon}/>
            {book.review}
            </div>

        </div>

      {/* 버튼 */}
      <div className={styles.button}>
        <button className={styles.cart}>장바구니</button>
        <button className={styles.buy}>바로구매</button>
        <button
          className={styles.heart}
          onClick={toggleLike}
          aria-pressed={liked}
          aria-label={liked ? "찜 취소" : "찜하기"}
        >
          {liked ? (
            <ClickHeartIcon className={styles.heartIcon} />
          ) : (
            <HeartIcon className={styles.heartIcon} />
          )}
        </button>
      </div>
    </div>
  );
}

