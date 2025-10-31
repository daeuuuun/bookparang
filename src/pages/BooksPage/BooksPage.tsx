import React, { useState, useEffect } from "react";
import axios from "axios";
import BookList from "../../components/BookList/BookList";
import styles from "./BooksPage.module.css";

interface Category {
  categoryId: number;
  categoryName: string;
  categoryPath: string;
}

const BooksPage: React.FC = () => {
  const [tab, setTab] = useState<"bestseller" | "new" | "all">("bestseller");
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // ✅ 각 탭별 정렬 상태 관리
  const [sortOptions, setSortOptions] = useState({
    bestseller: "latest",
    new: "latest",
    all: "latest",
  });

  // ✅ 카테고리 목록 불러오기
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("/api/books/categories");
        setCategories(res.data);
      } catch (error) {
        console.error("❌ 카테고리 불러오기 실패:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleTabChange = (newTab: "bestseller" | "new" | "all") => {
    setTab(newTab);
    setSelectedCategory("");
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  // ✅ 정렬 버튼 클릭 시
  const handleSortChange = (newSort: string) => {
    setSortOptions((prev) => ({
      ...prev,
      [tab]: newSort, // 현재 탭의 정렬만 변경
    }));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>📚 eBook 도서 조회</h1>

      {/* 🔹 탭 버튼 */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tabBtn} ${tab === "bestseller" ? styles.active : ""}`}
          onClick={() => handleTabChange("bestseller")}
        >
          🔥 베스트셀러
        </button>
        <button
          className={`${styles.tabBtn} ${tab === "new" ? styles.active : ""}`}
          onClick={() => handleTabChange("new")}
        >
          🆕 신간
        </button>
        <button
          className={`${styles.tabBtn} ${tab === "all" ? styles.active : ""}`}
          onClick={() => handleTabChange("all")}
        >
          📖 전체보기
        </button>
      </div>

      {/* 🔹 카테고리 선택 */}
      <div className={styles.categorySelect}>
        <label htmlFor="category">카테고리 선택:</label>
        <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">-- 전체 카테고리 --</option>
          {categories.map((cat, index) => (
            <option
              key={cat.categoryId ? cat.categoryId.toString() : `cat-${index}`}
              value={cat.categoryId?.toString() || ""}
            >
              {cat.categoryName}
            </option>
          ))}
        </select>
      </div>

      {/* 🔹 정렬 버튼 */}
      <div className={styles.sortButtons}>
        <button
          className={`${styles.sortBtn} ${sortOptions[tab] === "latest" ? styles.active : ""}`}
          onClick={() => handleSortChange("latest")}
        >
          🕒 최신순
        </button>
        <button
          className={`${styles.sortBtn} ${sortOptions[tab] === "priceAsc" ? styles.active : ""}`}
          onClick={() => handleSortChange("priceAsc")}
        >
          💰 최저가순
        </button>
        <button
          className={`${styles.sortBtn} ${sortOptions[tab] === "priceDesc" ? styles.active : ""}`}
          onClick={() => handleSortChange("priceDesc")}
        >
          💸 최고가순
        </button>
        <button
          className={`${styles.sortBtn} ${sortOptions[tab] === "rating" ? styles.active : ""}`}
          onClick={() => handleSortChange("rating")}
        >
          ⭐ 평점순
        </button>
      </div>

      {/* 🔹 도서 목록 */}
      <BookList
        type={tab}
        category={selectedCategory}
        sort={sortOptions[tab]} // ✅ 현재 탭의 정렬 기준 전달
      />
    </div>
  );
};

export default BooksPage;
