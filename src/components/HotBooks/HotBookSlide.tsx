import styles from "./HotBooks.module.css";
import type { HotBook } from "./hotBooksData";
import { ReactComponent as FireIcon } from "../BookRow/fire.svg";

interface HotBookSlideProps {
  book: HotBook;
}

export default function HotBookSlide({ book }: HotBookSlideProps) {
  return (
    <div className={styles.slide}>
        <div className={styles.slideInner}>
            {/* 상단 배너 이미지 (확대 배경) */}
            <div className={styles.imageBanner}>
                <img src={book.img} alt={book.title} className={styles.bannerImg} />
            </div>

            {/* 아래 겹쳐지는 본문 */}
            <div className={styles.cardBody}>
                <img src={book.img} alt={book.title} className={styles.bookImg} />
                <div className={styles.infoBox}>
                    <p className={styles.title}>{book.title}</p>
                    <p className={styles.author}>{book.author}</p>
                        <div className={styles.ment}>
                            <FireIcon className={styles.fireIcon} />
                            <p className={styles.why}>{book.why}</p>
                        </div>
                    <p
                        className={styles.comment}
                        dangerouslySetInnerHTML={{ __html: book.ment }}
                    />
                </div>
            </div>
        </div>
    </div>
  );
}
