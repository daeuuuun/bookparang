import { useEffect, useState } from "react";
import styles from "./ScrollToTopButton.module.css";
import { ReactComponent as ArrowUp } from "./arrow-up.svg";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // 스크롤 이벤트 등록
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200); // ✅ 200px 이상 스크롤 시 보이기
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 맨 위로 스크롤
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      className={`${styles.scrollButton} ${isVisible ? styles.show : ""}`}
      onClick={scrollToTop}
      aria-label="맨 위로 이동"
    >
      <ArrowUp className={styles.icon} />
      <span>TOP</span>
    </button>
  );
}
