import styles from "../NewBookSidebar/NewBookSidebar.module.css";
import { categories } from "../../data/categoriesData";

export default function NewBookSidebar() {
  return (
    <>
    <aside className={styles.sidebar}>
      <div className={styles.bestSellerBox}>
        <div className={styles.wrap}>
          <h3 className={styles.title}>카테고리</h3>
        </div>

        <ul className={styles.NewcategoryList}>
          {categories.map((category, index) => (
            <li key={index} className={styles.categoryItem}>
              {category}
            </li>
          ))}
        </ul>
       
        <div className={styles.categoryDivider} />
      </div>
    </aside>
    </>
  );
}
