import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useBookSearchWithAutoComplete from "../../hooks/useBookSearchWithAutoComplete";
import SearchFilter from "../../components/SearchFilter/SearchFilter";
import LayoutFilter from "../../components/LayoutFilter/LayoutFilter";
import BookRow from "../../components/BookRow/BookRow";
import BookTile from "../../components/BookTile/BookTile";
import styles from "./SearchResultsPage.module.css";

export default function SearchResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get("q") || "";

  const { books, searchBooks, loading } = useBookSearchWithAutoComplete();

  // ✅ 뷰 및 정렬 상태
  const [view, setView] = useState<"list" | "card">("list");
  const [sort, setSort] = useState<"latest" | "priceAsc" | "priceDesc" | "rating">("latest");

  // ✅ 필터 상태
  const [filters, setFilters] = useState<{ conditions: string[]; categories: number[] }>({
    conditions: [],
    categories: [],
  });
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);

  // ✅ 즐겨찾기 (로컬스토리지 저장)
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const handleFavorite = (isbn: string) => {
    setFavorites((prev) => {
      const updated = prev.includes(isbn)
        ? prev.filter((id) => id !== isbn)
        : [...prev, isbn];
      localStorage.setItem("favorites", JSON.stringify(updated));
      return updated;
    });
  };

  const handleAddCart = (isbn: string) => {
    alert(`장바구니에 ${isbn} 추가`);
  };

  const handleBookClick = (isbn: string) => {
    navigate(`/book/${isbn}`);
  };

  // ✅ 쿼리 변경 시 검색 실행
  useEffect(() => {
    if (query) searchBooks(query);
  }, [query]);

  useEffect(() => {
    if (books.length > 0) {
      console.log("📘 첫 번째 책 데이터:", books[0]);
    }
  }, [books]);

  // ✅ 필터 적용
  const filteredBooks = books.filter((book) => {
    const matchesCategory =
      filters.categories.length === 0 ||
      filters.categories.some((categoryId) => {
        const selectedCategory = categories.find((c) => c.id === categoryId);
        if (!selectedCategory) return false;
        return book.categoryName === selectedCategory.name;
      });

    const matchesSearchCondition =
      filters.conditions.length === 0 ||
      filters.conditions.some((condition) => {
        const lowerQuery = query.toLowerCase();

        if (condition === "상품명") return book.title?.toLowerCase().includes(lowerQuery);
        if (condition === "저자명") return book.authors?.toLowerCase().includes(lowerQuery);
        if (condition === "출판사") return book.publisher?.toLowerCase().includes(lowerQuery);

        return true;
      });

    return matchesCategory && matchesSearchCondition;
  });

  // ✅ 정렬 적용
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch (sort) {
      case "latest":
        return new Date(b.pubDate ?? 0).getTime() - new Date(a.pubDate ?? 0).getTime();
      case "priceAsc":
        return Number(a.salePrice) - Number(b.salePrice);
      case "priceDesc":
        return Number(b.salePrice) - Number(a.salePrice);
      case "rating":
        return (b.reviewRank ?? 0) - (a.reviewRank ?? 0);
      default:
        return 0;
    }
  });

  // ✅ 필터 변경 콜백
  const handleFilterChange = useCallback(
    ({ conditions, categories, keyword }: { conditions: string[]; categories: number[]; keyword: string }) => {
      setFilters({ conditions, categories });

      const searchQuery = keyword || query;
      if (searchQuery.trim()) {
        searchBooks(searchQuery);
      }
    },
    [query, searchBooks] // 의존성 최소화
  );

  return (
    <div className={styles.wrapper}>
      {/* 🔹 필터 (PC에서는 왼쪽, 모바일에서는 위로 이동) */}
      <SearchFilter
        onFilterChange={handleFilterChange}
        onCategoryLoad={setCategories}
      />

      {/* 🔹 콘텐츠 영역 */}
      <div className={styles.content}>
        <h2 className={styles.title}>“{query}” 검색 결과</h2>
        <hr className={styles.hrLine} />

        <div className={styles.filter}>
          <LayoutFilter
            view={view}
            onChange={setView}
            sort={sort}
            onSortChange={setSort}
            showSort
          />
        </div>

        <div className={view === "card" ? styles.cardView : styles.listView}>
          {loading && <p className={styles.loading}>검색 중...</p>}
          {!loading && sortedBooks.length === 0 && (
            <p className={styles.empty}>검색 결과가 없습니다 😢</p>
          )}

          {!loading &&
            sortedBooks.map((book) =>
              view === "list" ? (
                <BookRow
                  key={book.id}
                  book={{
                    isbn: book.id,
                    title: book.title,
                    author: book.authors,
                    publisher: book.publisher,
                    pubDate: book.pubDate || "정보 없음",
                    image: book.thumbnail,
                    listPrice: Number(book.listPrice) || 0,
                    salePrice: Number(book.salePrice) || 0,
                    discountRate: Number(book.discountRate) || 0,
                    rating: book.reviewRank ?? 0,
                    comment: "",
                    categoryId: Number(book.categoryId),
                  }}
                  showRank={false}
                  isFavorited={favorites.includes(book.id)}
                  onFavorite={handleFavorite}
                  onAddCart={handleAddCart}
                  reviewAverage={book.reviewRank}
                  onClick={() => handleBookClick(book.id)}
                />
              ) : (
                <BookTile
                  key={book.id}
                  book={{
                    isbn: book.id,
                    title: book.title,
                    author: book.authors,
                    image: book.thumbnail,
                    listPrice: Number(book.listPrice) || 0,
                    salePrice: Number(book.salePrice) || 0,
                    discountRate: Number(book.discountRate) || 0,
                    rating: book.reviewRank ?? 0,
                    publisher: book.publisher,
                    pubDate: book.pubDate || "정보 없음",
                    comment: "",
                    categoryId: Number(book.categoryId),
                  }}
                  isFavorited={favorites.includes(book.id)}
                  onFavorite={handleFavorite}
                  onAddCart={handleAddCart}
                  reviewAverage={book.reviewRank}
                  onClick={() => handleBookClick(book.id)}
                />
              )
            )}
        </div>
      </div>
    </div>
  );
}
