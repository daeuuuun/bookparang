import styles from "./LayoutFilter.module.css";
import list from "../LayoutFilter/list.svg";
import card from "../LayoutFilter/card.svg";

type ViewMode = "list" | "card";

interface Props {
  view?: ViewMode;
  onChange?: (mode: ViewMode) => void;
}

export default function LayoutFilter({ view = "list", onChange }: Props) {
  return (
    <div className={styles.filterBox}>
      <div className={styles.filterInner}>
        <button
          className={`${styles.filterButton} ${view === "list" ? styles.active : ""}`}
          onClick={() => onChange?.("list")}
          aria-pressed={view === "list"}
        >
          <img src={list} alt="리스트형" className={styles.filterIcon} />
        </button>
        <button
          className={`${styles.filterButton} ${view === "card" ? styles.active : ""}`}
          onClick={() => onChange?.("card")}
          aria-pressed={view === "card"}
        >
          <img src={card} alt="카드형" className={styles.filterIcon} />
        </button>
      </div>
    </div>
  );
}
