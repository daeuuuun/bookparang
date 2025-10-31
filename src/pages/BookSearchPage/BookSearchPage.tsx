import { useState } from "react";
import type { FormEvent } from "react";
import useBookSearch from "../../hooks/useBookSearch";
import type { BookData } from "../../hooks/useBookSearch";
import styles from "./BookSearchPage.module.css";

export default function BookSearchPage() {
  const [query, setQuery] = useState<string>("");
  const { books, loading, error, searchBooks } = useBookSearch();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) searchBooks(query);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>📚 서점 검색</h1>

      <form onSubmit={handleSearch} className={styles.form}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="책 제목을 입력하세요"
          className={styles.input}
        />
        <button className={styles.button}>검색</button>
      </form>

      {error && <p className={styles.error}>{error}</p>}

      {/* ✅ Skeleton UI 표시 */}
      {loading ? (
        <ul className={styles.bookList}>
          {Array.from({ length: 5 }).map((_, i) => (
            <li key={i} className={styles.skeletonCard}>
              <div className={styles.skeletonThumbnail}></div>
              <div className={styles.skeletonInfo}>
                <div className={styles.skeletonLine}></div>
                <div className={styles.skeletonLine}></div>
                <div className={styles.skeletonShortLine}></div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <ul className={styles.bookList}>
          {books.map((book: BookData) => (
            <li key={book.id} className={styles.bookCard}>
              <img
                src={book.thumbnail}
                alt={book.title}
                className={styles.thumbnail}
              />
              <div>
                <h2 className={styles.bookTitle}>{book.title}</h2>
                <p className={styles.bookAuthors}>{book.authors}</p>
                <p className={styles.bookPublisher}>{book.publisher}</p>
                <p>💰 정가: {book.listPrice}원</p>
                <p>💰 판매가: {book.salePrice}원</p>
                <p>⭐ 평점: {book.reviewRank}</p>
                <a
                  href={book.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  자세히 보기
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
