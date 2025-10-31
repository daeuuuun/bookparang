import { useState } from "react";
import type { Book } from "../../data/books";
import styles from "./NewBookTile.module.css";
import { ReactComponent as StarIcon} from "../BookRow/star.svg";
import { ReactComponent as HeartIcon } from "../BookRow/heart.svg";
import { ReactComponent as ClickHeartIcon } from "../BookRow/clickheart.svg";

interface Props {
  book: Book;
  rank?: number;
}

export default function BookTile ({ book, rank }: Props) {
    const [liked, setLiked] = useState(false);

    const toggleLike = () => setLiked((v) => !v);

    return (
        <>
            <div className={styles.tile}>
                <div
                    className={styles.imageWrapper}
                    style={{ ["--bg" as any]: `url(${book.image})` }}
                >
                    <img src={book.image} alt={book.title} className={styles.image} />
                </div>
                <div className={styles.booklist}>
                    <h3 className={styles.title}>{book.title}</h3>
                    <p className={styles.author}>{book.author}</p>
                    <div className={styles.price_review}>
                        <p className={styles.price}>{book.price}</p>
                        <div className={styles.review}>
                            <StarIcon className={styles.starIcon}/>
                            {book.review}
                        </div>
                    </div>
                    <div className={styles.sale}>
                        <p className={styles.discount}>{book.discount}</p>
                        <p className={styles.percent}>{book.percent}</p>
                    </div>
                </div>

                 {/* 버튼 */}
                <div className={styles.button}>
                    <button className={styles.cart}>담기</button>
                    <button className={styles.buy}>구매</button>
                    <button
                    className={styles.heart}
                    onClick={toggleLike}
                    aria-pressed={liked}
                    aria-label={liked ? "찜 취소" : "찜하기"}
                    >
                    {liked ? (
                        <ClickHeartIcon className={styles.heartIcon} />
                    ) : (
                        <HeartIcon className={styles.heartIcon} />
                    )}
                    </button>
                </div>
            </div>
        </>
    );
}