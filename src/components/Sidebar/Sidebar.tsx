import { useState, useEffect } from "react";
import styles from "./Sidebar.module.css";
import { ReactComponent as NextIcon } from "./next.svg";
import { categories } from "../../data/categoriesData.js";

interface SidebarProps {
  onCategorySelect: (category: string) => void;
  selectedCategory: string;
  mainTitle?: string;
  subTitle?: string;
  defaultCategory?: string;
}

export default function Sidebar({
  onCategorySelect,
  selectedCategory,
  mainTitle = "종합 베스트",
  subTitle = "분야 베스트",
  defaultCategory = "종합 베스트",
}: SidebarProps) {
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState("종합 베스트");

  // ✅ 반응형 감지
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ 모바일 레이아웃
  if (isMobile) {
    return (
      <div className={styles.mobileWrapper}>
        {/* 상단 탭 */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tabBtn} ${
              activeTab === "종합 베스트" ? styles.activeTab : ""
            }`}
            onClick={() => {
              setActiveTab("종합 베스트");
              onCategorySelect(defaultCategory);
            }}
          >
            {mainTitle}
          </button>
          <button
            className={`${styles.tabBtn} ${
              activeTab === "분야 베스트" ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab("분야 베스트")}
          >
            {subTitle}
          </button>
        </div>

        {/* 분야 베스트 탭일 때만 가로 스크롤 */}
        {activeTab === "분야 베스트" && (
          <div className={styles.categoryScroll}>
            {categories.map((category, index) => (
              <button
                key={index}
                className={`${styles.categoryChip} ${
                  selectedCategory === category ? styles.activeChip : ""
                }`}
                onClick={() => onCategorySelect(category)}
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // ✅ PC 레이아웃 (화살표 + 접기/펼치기 포함)
  const isMainActive = selectedCategory === defaultCategory;
  const isCategoryActive = categories.includes(selectedCategory);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.bestSellerBox}>
        {/* 종합 베스트 */}
        <div
          className={`${styles.wrap} ${isMainActive ? styles.active : ""}`}
          onClick={() => onCategorySelect(defaultCategory)}
        >
          <h3 className={styles.title}>{mainTitle}</h3>
          <button className={styles.nextButton}>
            <NextIcon
              className={`${styles.nextIcon} ${
                isMainActive ? styles.arrowRight : styles.arrowDown
              }`}
            />
          </button>
        </div>

        {/* 분야 베스트 */}
        <div
          className={`${styles.categoryHeader} ${
            isCategoryActive ? styles.active : ""
          }`}
          onClick={() => setIsCategoryOpen((prev) => !prev)}
        >
          <span className={styles.categoryTitle}>{subTitle}</span>
          <NextIcon
            className={`${styles.nextIcon} ${
              isCategoryOpen ? styles.arrowDown : styles.arrowRight
            }`}
          />
        </div>

        {/* 펼쳐지는 카테고리 */}
        <ul
          className={`${styles.categoryList} ${
            isCategoryOpen ? styles.open : styles.closed
          }`}
        >
          {categories.map((category, index) => (
            <li
              key={index}
              className={`${styles.categoryItem} ${
                selectedCategory === category ? styles.active : ""
              }`}
              onClick={() => onCategorySelect(category)}
            >
              {category}
            </li>
          ))}
        </ul>

        <div className={styles.categoryDivider} />
      </div>
    </aside>
  );
}
