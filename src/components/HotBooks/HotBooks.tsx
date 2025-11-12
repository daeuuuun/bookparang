import { useState, useEffect } from "react";
import styles from "./HotBooks.module.css";
import HotBookSlide from "./HotBookSlide";
import { hotBooks } from "./hotBooksData";
import { ReactComponent as ArrowLeft } from "../MainBanner/arrowleft.svg";
import { ReactComponent as ArrowRight } from "../MainBanner/arrowright.svg";

export default function HotBooks() {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1200);

  const visibleCount = 2;
  const cardWidth = 569;
  const gap = 24;

  const maxIndex = Math.ceil(hotBooks.length / visibleCount) - 1;

  // 화면 resize 감지
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1200);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    if (isMobile) return; // 모바일에서는 버튼 사용 안 함
    if (current < maxIndex) setCurrent(current + 1);
  };

  const prevSlide = () => {
    if (isMobile) return;
    if (current > 0) setCurrent(current - 1);
  };

  const moveX = () => {
    const totalCards = hotBooks.length;
    if (current === maxIndex && totalCards % visibleCount !== 0) {
      const remaining = totalCards % visibleCount;
      return (cardWidth + gap) * remaining * current;
    }
    return (cardWidth + gap) * visibleCount * current;
  };

  return (
    <section className={styles.hotBookSection}>
      <div className={styles.contentWrapper}>
        <p className={styles.subMent}>지금 놓치기는 아쉬운</p>
        <h2 className={styles.mainTitle}>화제의 책</h2>

        <div className={styles.sliderContainer}>
          {!isMobile && (
            <button
              className={`${styles.arrow} ${styles.left}`}
              onClick={prevSlide}
              disabled={current === 0}
            >
              <ArrowLeft />
            </button>
          )}

          <div
            className={styles.sliderViewport}
            style={{ overflowX: isMobile ? "auto" : "hidden" }}
          >
            <div
              className={styles.sliderTrack}
              style={{
                transform: isMobile ? "none" : `translateX(-${moveX()}px)`,
                transition: isMobile ? "none" : "transform 0.4s ease",
              }}
            >
              {hotBooks.map((book) => (
                <HotBookSlide key={book.id} book={book} />
              ))}
            </div>
          </div>

          {!isMobile && (
            <button
              className={`${styles.arrow} ${styles.right}`}
              onClick={nextSlide}
              disabled={current === maxIndex}
            >
              <ArrowRight />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
