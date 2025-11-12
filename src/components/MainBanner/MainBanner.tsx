import styles from "./MainBanner.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../MainBanner/arrowleft.svg";
import { ReactComponent as ArrowRight } from "../MainBanner/arrowright.svg";
import banner1 from "../MainBanner/banner1.png";
import banner2 from "../MainBanner/banner2.png";
import banner3 from "../MainBanner/banner3.png";
import banner01 from "./banner01.png";
import banner02 from "./banner02.png";
import banner03 from "./banner03.png";

export default function MainBanner() {
  const [current, setCurrent] = useState(0);
  const [images, setImages] = useState([banner1, banner2, banner3]);
  const navigate = useNavigate();

  // ✅ 화면 크기에 따라 이미지 세트 변경
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setImages([banner01, banner02, banner03]);
      } else {
        setImages([banner1, banner2, banner3]);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ 자동 슬라이드
  useEffect(() => {
    const interval = setInterval(() => nextSlide(), 4000);
    return () => clearInterval(interval);
  }, [current, images]);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % images.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + images.length) % images.length);

  // ✅ 배너 클릭 시 이벤트 페이지로 이동
  const handleBannerClick = () => {
    navigate("/event");
  };

  return (
    <div className={styles.slider} onClick={handleBannerClick}>
      <div
        className={styles.slideTrack}
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((src, i) => (
          <img key={i} src={src} alt={`slide-${i}`} className={styles.slide} />
        ))}
      </div>

      <div className={styles.sliderContent}>
        {/* 🔽 필요 없으면 화살표 제거 가능 */}
        <button
          className={`${styles.arrow} ${styles.left}`}
          onClick={(e) => {
            e.stopPropagation(); // ✅ 클릭 이벤트 배너로 전파 방지
            prevSlide();
          }}
        >
          <ArrowLeft className={styles.arrowIcon} />
        </button>
        <button
          className={`${styles.arrow} ${styles.right}`}
          onClick={(e) => {
            e.stopPropagation();
            nextSlide();
          }}
        >
          <ArrowRight className={styles.arrowIcon} />
        </button>

        <div className={styles.overlay}>
          <button
            className={styles.viewAll}
            onClick={(e) => {
              e.stopPropagation(); // ✅ "모두보기" 버튼 눌러도 배너 클릭 이벤트 막기
              navigate("/event");
            }}
          >
            <span>
              {current + 1}/{images.length}
            </span>{" "}
            모두보기
          </button>
        </div>
      </div>
    </div>
  );
}
