import styles from "./MainBestSeller.module.css";

export default function SkeletonBookCard() {
  return (
    <div className={`${styles.bookCard} ${styles.skeletonCard}`}>
      <div className={`${styles.bookImgWrapper} ${styles.skeletonBox}`} />
      <div className={styles.bookInfo}>
        <div className={styles.rankWrapper}>
          <div className={`${styles.skeletonLine} ${styles.rankSkeleton}`} />
          <div className={`${styles.skeletonLine} ${styles.lineSkeleton}`} />
        </div>
        <div className={`${styles.skeletonLine} ${styles.titleSkeleton}`} />
        <div className={`${styles.skeletonLine} ${styles.authorSkeleton}`} />
      </div>
    </div>
  );
}
