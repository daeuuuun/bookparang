import { useNavigate } from "react-router-dom";
import styles from "./CategoryDropdown.module.css";
import { categories, categoryIdMap } from "../../data/categoryIdMap";

export default function CategoryDropdown() {
  const navigate = useNavigate();

  const handleCategoryClick = (category: string) => {
    const categoryId = categoryIdMap[category];
    navigate(`/category?category=${categoryId}`);
  };

  return (
    <div className={styles.dropdown}>
      <p className={styles.book}>전자책</p>
      <ul className={styles.categoryList}>
        {categories.map((item) => (
          <li
            key={item}
            className={styles.categoryItem}
            onClick={() => handleCategoryClick(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
