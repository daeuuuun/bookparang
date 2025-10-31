import styles from './Sidebar.module.css';
import { ReactComponent as NextIcon } from "./next.svg";
import { categories } from "../../data/categoriesData.js";

export default function Sidebar({ onCategorySelect }) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.bestSellerBox}>
        <div className={styles.wrap}>
          <h3 className={styles.title}>종합 베스트</h3>
          <button className={styles.nextButton}>
            <NextIcon className={styles.nextIcon} />
          </button>
        </div>

        <div className={styles.categoryTitle}>분야 베스트</div>
        <ul className={styles.categoryList}>
          {categories.map((category, index) => (
            <li
              key={index}
              className={styles.categoryItem}
              onClick={() => onCategorySelect(category)} // ✅ 클릭 시 선택
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
