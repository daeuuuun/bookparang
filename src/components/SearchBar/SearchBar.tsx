import { useState } from "react";
import useBookSearchWithAutoComplete from "../../hooks/useBookSearchWithAutoComplete";
import styles from "./SearchBar.module.css";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const {
    books,
    suggestions,
    loading,
    fetchSuggestions,
    searchBooks,
  } = useBookSearchWithAutoComplete();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    fetchSuggestions(value); // 자동완성 요청
  };

  const handleSelect = (title: string) => {
    setQuery(title);
    searchBooks(title);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchBooks(query);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="책 제목을 입력하세요..."
          className={styles.input}
        />
      </form>

      {/* 🔽 자동완성 리스트 */}
      {suggestions.length > 0 && (
        <ul className={`${styles.suggestions} ${styles.fadeIn}`}>
          {suggestions.map((title, idx) => (
            <li
              key={idx}
              onClick={() => handleSelect(title)}
              className={styles.item}
            >
              {title}
            </li>
          ))}
        </ul>
      )}

      {/* 📚 검색 결과 */}
      {loading && <p className={styles.loading}>검색 중...</p>}
      {!loading && books.length > 0 && (
        <div className={styles.grid}>
          {books.map((book) => (
            <div key={book.id} className={styles.card}>
              <img
                src={book.thumbnail}
                alt={book.title}
                className={styles.thumbnail}
              />
              <h3 className={styles.title}>{book.title}</h3>
              <p className={styles.authors}>{book.authors}</p>
              <p className={styles.price}>
                정가: <span>{book.listPrice}</span> / 판매가:{" "}
                <b>{book.salePrice}</b>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
