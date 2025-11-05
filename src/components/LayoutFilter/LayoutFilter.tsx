import styles from "./LayoutFilter.module.css";
import { ReactComponent as ListIcon } from "./list.svg";
import { ReactComponent as CardIcon } from "./card.svg";

type ViewMode = "list" | "card";
type SortMode = "latest" | "priceAsc" | "priceDesc" | "rating";

interface Props {
  view?: ViewMode;
  onChange?: (mode: ViewMode) => void;
  sort?: SortMode;
  onSortChange?: (sort: SortMode) => void;
  showSort?: boolean;
}

export default function LayoutFilter({
  view = "list",
  onChange,
  sort = "latest",
  onSortChange,
  showSort = true,
}: Props) {
  return (
    <div
      className={`${styles.filterBox} ${
        showSort ? styles.withSort : styles.noSort
      }`}
    >
      {showSort && (
        <div className={styles.leftControls}>
          <button
            className={`${styles.sortButton} ${
              sort === "latest" ? styles.activeSort : ""
            }`}
            onClick={() => onSortChange?.("latest")}
          >
            최신순
          </button>
          <button
            className={`${styles.sortButton} ${
              sort === "priceAsc" ? styles.activeSort : ""
            }`}
            onClick={() => onSortChange?.("priceAsc")}
          >
            최저가순
          </button>
          <button
            className={`${styles.sortButton} ${
              sort === "priceDesc" ? styles.activeSort : ""
            }`}
            onClick={() => onSortChange?.("priceDesc")}
          >
            최고가순
          </button>
          <button
            className={`${styles.sortButton} ${
              sort === "rating" ? styles.activeSort : ""
            }`}
            onClick={() => onSortChange?.("rating")}
          >
            별점순
          </button>
        </div>
      )}

      <div className={styles.rightControls}>
        <button
          className={`${styles.filterButton} ${
            view === "list" ? styles.active : ""
          }`}
          onClick={() => onChange?.("list")}
          aria-pressed={view === "list"}
        >
          <ListIcon className={styles.filterIcon} />
        </button>
        <button
          className={`${styles.filterButton} ${
            view === "card" ? styles.active : ""
          }`}
          onClick={() => onChange?.("card")}
          aria-pressed={view === "card"}
        >
          <CardIcon className={styles.filterIcon} />
        </button>
      </div>
    </div>
  );
}
