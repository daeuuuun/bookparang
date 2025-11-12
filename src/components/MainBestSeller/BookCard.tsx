import { useNavigate } from "react-router-dom";
import type { Book } from "../../types/books";
import styles from "./MainBestSeller.module.css";

interface BookCardProps {
  book: Book;
  rank: number;
}

export default function BookCard({ book, rank }: BookCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (book.isbn) {
      navigate(`/book/${book.isbn}`);
    }
  };

  return (
    <div className={styles.bookCard} onClick={handleClick}>
      {/* 왼쪽 이미지 */}
      <div className={styles.bookImgWrapper}>
        <img
          src={book.image || "/no-image.png"}
          alt={book.title}
          className={styles.img}
        />
      </div>

      {/* 오른쪽 랭킹 + 회색선 + 제목 + 작가 */}
      <div className={styles.bookInfo}>
        <div className={styles.rankWrapper}>
          <span className={styles.rank}>{rank}</span>
          <span className={styles.rankLine}></span>
        </div>
        <h3>{book.title}</h3>
        <p>{book.author}</p>
      </div>
    </div>
  );
}
