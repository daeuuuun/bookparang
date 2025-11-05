import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./PurchaseSuccessPage.module.css";

interface Book {
  id: number;
  title: string;
  price: number;
  image: string;
  tag?: string;
}

const PurchaseSuccessPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 장바구니에서 선택된 책 정보 받아오기
  const { purchasedBooks = [], totalPrice = 0 } = location.state || {};

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>결제완료</h2>

      <hr />

      <div className={styles.box}>
        <div className={styles.message}>
          <h3>
            구매가 <span className={styles.highlight}>완료</span>되었습니다
          </h3>
          <p>구매된 작품은 자동으로 내서재에 등록됩니다.</p>
        </div>

        <div className={styles.bookList}>
          {purchasedBooks.map((book: Book) => (
            <div key={book.id} className={styles.bookItem}>
              <img src={book.image} alt={book.title} className={styles.bookImg} />
              <div className={styles.bookInfo}>
                <h4>{book.title}</h4>
                <p>
                  {book.price.toLocaleString()}원{" "}
                  <span className={styles.tag}>{book.tag}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.totalRow}>
          <span>총 결제 금액</span>
          <span className={styles.totalPrice}>
            {totalPrice.toLocaleString()} 원
          </span>
        </div>
      </div>

      <div className={styles.btnGroup}>
        <button
          className={styles.myBtn}
          onClick={() => navigate("/my")}
        >
          내 서재로 이동하기
        </button>
        <button
          className={styles.bestBtn}
          onClick={() => navigate("/bestseller")}
        >
          계속 쇼핑하기
        </button>
      </div>
    </div>
  );
};

export default PurchaseSuccessPage;
