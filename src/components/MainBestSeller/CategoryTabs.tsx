import styles from "./MainBestSeller.module.css";

interface CategoryTabsProps {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
}

export default function CategoryTabs({
  categories,
  selected,
  onSelect,
}: CategoryTabsProps) {
  return (
    <ul className={styles.categoryTabs}>
      {categories.map((cat) => (
        <li
          key={cat}
          className={`${styles.tab} ${selected === cat ? styles.active : ""}`}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </li>
      ))}
    </ul>
  );
}
