import { useState } from "react";
import useBookSearchWithAutoComplete from "../../hooks/useBookSearchWithAutoComplete";
import searchIcon from "../Header/search.svg";
import styles from "./SearchBar.module.css";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [, setHoveredTitle] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);

  const { books, suggestions, loading, fetchSuggestions, searchBooks } =
    useBookSearchWithAutoComplete();

  const handleFocus = () => {
    setShowResults(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    fetchSuggestions(value);
    setShowResults(true);
  };

  const handleHover = (title: string) => {
    setHoveredTitle(title);
    searchBooks(title);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchBooks(query);
    setShowResults(true);
  };

  const handleClose = () => {
    setShowResults(false);
    setHoveredTitle(null);
  };

  const displayedBook = books[0];

  return (
    <div className={styles.pageWrapper}>
      {/* 🔍 상단 검색창 */}
      <form onSubmit={handleSubmit} className={styles.searchBar}>
        <input
          type="text"
          value={query}
          onFocus={handleFocus}
          onChange={handleChange}
          placeholder="검색해보세요"
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>
          <img src={searchIcon} alt="검색" className={styles.icon} />
        </button>
      </form>

      {/* 📚 하단 결과 박스 */}
      {showResults && (
        <div className={styles.container}>
          <div className={styles.resultContainer}>
            {/* 왼쪽 자동완성 */}
            <ul className={styles.suggestions}>
              {suggestions.length > 0 ? (
                suggestions.map((title, idx) => (
                  <li
                    key={idx}
                    onMouseEnter={() => handleHover(title)}
                    className={styles.item}
                  >
                    {title}
                  </li>
                ))
              ) : (
                <li className={styles.empty}>검색어를 입력해주세요</li>
              )}
            </ul>

            {/* 오른쪽 미리보기 */}
            <div className={styles.preview}>
              {loading && <p className={styles.loading}>검색 중...</p>}
              {!loading && displayedBook && (
                <div className={styles.card}>
                  <img
                    src={displayedBook.thumbnail}
                    alt={displayedBook.title}
                    className={styles.thumbnail}
                  />
                  <div className={styles.bookInfo}>
                    <h3 className={styles.title}>{displayedBook.title}</h3>
                    <p className={styles.authors}>{displayedBook.authors}</p>
                    <p className={styles.price}>
                      정가: <span>{displayedBook.listPrice}</span> / 판매가:{" "}
                      <b>{displayedBook.salePrice}</b>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 닫기 버튼 — 항상 보이도록 */}
          <div className={styles.closeDiv}>
            <button onClick={handleClose} className={styles.closeButton}>
              닫기 ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
