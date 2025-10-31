import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar/Sidebar";
import LayoutFilter from "../../components/LayoutFilter/LayoutFilter";
import BookTile from "../../components/BookTile/BookTile";
import BookRow from "../../components/BookRow/BookRow";
import styles from "./BestSellerPage.module.css";
import type { Book } from "../../types/books";
import type { Review } from "../../types/review";

export default function BestSellerPage() {
  const [view, setView] = useState<"list" | "card">("list");
  const [books, setBooks] = useState<Book[]>([]);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [reviewAverages, setReviewAverages] = useState<Record<string, number>>({}); // ✅ 추가
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [, setSelectedCategory] = useState("");

  // ✅ 로그인 여부 확인
  const fetchUser = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/users/me", {
        withCredentials: true,
      });
      if (res.data) setIsLoggedIn(true);
    } catch {
      setIsLoggedIn(false);
    }
  }, []);

  // ✅ 찜 상태 불러오기
  const fetchFavorites = useCallback(
    async (bookList: Book[]) => {
      if (!isLoggedIn) return;
      const favMap: Record<string, boolean> = {};
      await Promise.all(
        bookList.map(async (book) => {
          try {
            const res = await axios.get(
              `http://localhost:4000/api/wishlist/${book.isbn}`,
              { withCredentials: true }
            );
            favMap[book.isbn] = res.data.isFavorited;
          } catch {
            favMap[book.isbn] = false;
          }
        })
      );
      setFavorites(favMap);
    },
    [isLoggedIn]
  );

  // ✅ 찜 토글
  const toggleFavorite = async (isbn: string) => {
    if (!isLoggedIn) {
      alert("로그인 후 이용해주세요 😄");
      return;
    }

    try {
      if (favorites[isbn]) {
        await axios.delete(`http://localhost:4000/api/wishlist/${isbn}`, {
          withCredentials: true,
        });
        setFavorites((prev) => ({ ...prev, [isbn]: false }));
      } else {
        await axios.post(
          `http://localhost:4000/api/wishlist/${isbn}`,
          {},
          { withCredentials: true }
        );
        setFavorites((prev) => ({ ...prev, [isbn]: true }));
      }
    } catch (err) {
      console.error("❌ 찜 토글 실패:", err);
    }
  };

  // ✅ 장바구니 추가
  const addToCart = async (isbn: string) => {
    try {
      await axios.post(`http://localhost:4000/api/cart/${isbn}`, {}, { withCredentials: true });
      alert("🛒 장바구니에 추가되었습니다!");
    } catch (err) {
      console.error("❌ 장바구니 추가 실패:", err);
      alert("장바구니 추가 중 오류가 발생했습니다 😢");
    }
  };

  // ✅ 베스트셀러 불러오기 + 리뷰 평균 계산
  useEffect(() => {
    const fetchBestsellers = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await axios.get<Book[]>(
          "http://localhost:4000/api/books/bestseller"
        );

        const mappedBooks: Book[] = res.data.map((b, index) => ({
          isbn: b.isbn ?? `temp-isbn-${index}`,
          title: b.title,
          author: b.author,
          salePrice: b.salePrice ?? 0,
          listPrice: b.listPrice ?? b.salePrice ?? 0,
          discountRate: b.discountRate ?? 0,
          rating: b.rating ?? 0,
          image:
            b.image ??
            `https://via.placeholder.com/150?text=${encodeURIComponent(
              b.title.slice(0, 30)
            )}`,
          publisher: b.publisher ?? "",   // ✅ 출판사
          pubDate: b.pubDate ?? "",       // ✅ 출간일
          comment: b.comment ?? "",       // ✅ 코멘트
          category: b.category ?? "기타",
        }));

        console.log("📚 API raw data:", res.data[0]);
        setBooks(mappedBooks);

        // ✅ 리뷰 평균 불러오기
        const avgMap: Record<string, number> = {};
        await Promise.all(
          mappedBooks.map(async (book) => {
            try {
              const res = await axios.get<Review[]>(
                `http://localhost:4000/api/reviews/${book.isbn}`
              );
              const reviews = res.data;
              if (reviews.length > 0) {
                const avgRating =
                  reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
                avgMap[book.isbn] = Number(avgRating.toFixed(1));
              }
            } catch {
              /* 리뷰 없으면 무시 */
            }
          })
        );
        setReviewAverages(avgMap);

        // ✅ 찜 상태 불러오기
        await fetchUser();
        await fetchFavorites(mappedBooks);
      } catch (err) {
        console.error("❌ 베스트셀러 불러오기 실패:", err);
        setError("베스트셀러 목록을 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchBestsellers();
  }, [fetchUser, fetchFavorites]);

  // ✅ 로딩 / 에러 처리
  if (loading)
    return <p className={styles.loading}>📚 도서 목록을 불러오는 중...</p>;
  if (error)
    return <p className={styles.error}>{error}</p>;

  // ✅ 도서 목록 렌더링
  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.title}>🔥 베스트셀러</h2>
        <div className={styles.line} />
      </div>

      <Sidebar onCategorySelect={setSelectedCategory} />
      <LayoutFilter view={view} onChange={(m) => setView(m)} />

      {books.length > 0 ? (
        <div className={styles.bookList}>
          {view === "list" ? (
            <>
              {/* 첫 번째 책 */}
              <BookRow
                key={books[0].isbn}
                book={books[0]}
                rank={1}
                isFavorited={favorites[books[0].isbn] ?? false}
                onFavorite={toggleFavorite}
                onAddCart={addToCart}
                reviewAverage={reviewAverages[books[0].isbn] ?? undefined}
              />

              {/* 나머지 책 */}
              {books.slice(1, 30).map((book, i) => (
                <BookRow
                  key={book.isbn}
                  book={book}
                  rank={i + 2}
                  isFavorited={favorites[book.isbn] ?? false}
                  onFavorite={toggleFavorite}
                  onAddCart={addToCart}
                  reviewAverage={reviewAverages[book.isbn] ?? undefined}
                />
              ))}
            </>
          ) : (
            <div className={styles.tileGrid}>
              {books.slice(0, 30).map((book, i) => (
                <BookTile
                  key={book.isbn}
                  book={book}
                  rank={i + 1}
                  isFavorited={favorites[book.isbn] ?? false}
                  onFavorite={toggleFavorite}
                  onAddCart={addToCart}
                  reviewAverage={reviewAverages[book.isbn] ?? undefined}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <p className={styles.loading}>표시할 도서가 없습니다 😢</p>
      )}
    </>
  );
}
