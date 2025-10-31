import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./CartPage.module.css";
import { useNavigate } from "react-router-dom";

interface CartBook {
  isbn: string;
  title: string;
  author?: string;
  image?: string;
  salePrice?: number;
}

interface CartItem {
  bookIsbn: string;
  quantity: number;
  book?: CartBook;
}

const CartPage: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const navigate = useNavigate();

  // ✅ 장바구니 목록 불러오기
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get<CartItem[]>("http://localhost:4000/api/cart", {
          withCredentials: true,
        });
        setCart(res.data);
      } catch (err) {
        console.error("❌ 장바구니 불러오기 실패:", err);
      }
    };
    fetchCart();
  }, []);

  // ✅ 개별 아이템 삭제
  const removeItem = async (isbn: string) => {
    try {
      await axios.delete(`http://localhost:4000/api/cart/${isbn}`, {
        withCredentials: true,
      });
      setCart((prev) => prev.filter((item) => item.bookIsbn !== isbn));
      setSelectedItems((prev) => prev.filter((id) => id !== isbn));
    } catch (err) {
      console.error("❌ 장바구니 삭제 실패:", err);
    }
  };

  // ✅ 선택 삭제
  const handleDeleteSelected = async () => {
    if (selectedItems.length === 0) return alert("삭제할 도서를 선택하세요!");
    for (const isbn of selectedItems) {
      await removeItem(isbn);
    }
    alert("🗑️ 선택한 도서가 삭제되었습니다.");
  };

  // ✅ 선택 찜하기
  const handleWishlistSelected = async () => {
    if (selectedItems.length === 0) return alert("찜할 도서를 선택하세요!");
    try {
      for (const isbn of selectedItems) {
        await axios.post(
          `http://localhost:4000/api/wishlist/${isbn}`,
          {},
          { withCredentials: true }
        );
      }
      alert("💖 선택한 도서가 찜 목록에 추가되었습니다!");
    } catch (err) {
      console.error("❌ 찜하기 실패:", err);
    }
  };

  const handleCheckoutSelected = async () => {
    if (selectedItems.length === 0) {
      alert("결제할 도서를 선택하세요!");
      return;
    }

    // 선택한 도서 정보 추출
    const selectedBooks = cart
      .filter((item) => selectedItems.includes(item.bookIsbn))
      .map((item) => ({
        isbn: item.bookIsbn,
        price: item.book?.salePrice || 0,
      }));

    try {
      // ✅ 서버에 결제 요청 (DB에 구매 정보 저장)
      await axios.post(
        "http://localhost:4000/api/purchase",
        { books: selectedBooks },
        { withCredentials: true }
      );

      // ✅ 장바구니에서 선택 항목 제거 (결제 완료 후 비우기)
      setCart((prev) => prev.filter((item) => !selectedItems.includes(item.bookIsbn)));
      setSelectedItems([]);

      // ✅ 결제 완료 페이지로 이동
      navigate("/purchase");
    } catch (err) {
      console.error("❌ 결제 실패:", err);
      alert("결제 중 오류가 발생했습니다 😢");
    }
  };

  // ✅ 전체 선택 / 해제
  const toggleSelectAll = () => {
    if (selectedItems.length === cart.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cart.map((item) => item.bookIsbn));
    }
  };

  const total = cart
    .filter((item) => selectedItems.includes(item.bookIsbn))
    .reduce((sum, item) => sum + (item.book?.salePrice ?? 0), 0);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>🛒 장바구니</h2>

      {cart.length === 0 ? (
        <p className={styles.empty}>장바구니가 비어 있습니다 😢</p>
      ) : (
        <>
          {/* ✅ 전체 선택 버튼 */}
          <div className={styles.actions}>
            <button onClick={toggleSelectAll}>
              {selectedItems.length === cart.length ? "❌ 전체 해제" : "✅ 전체 선택"}
            </button>
            <span className={styles.selectedCount}>
              선택된 도서: {selectedItems.length}권
            </span>
          </div>

          {/* ✅ 도서 리스트 */}
          <ul className={styles.list}>
            {cart.map((item) => (
              <li key={item.bookIsbn} className={styles.item}>
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.bookIsbn)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedItems((prev) => [...prev, item.bookIsbn]);
                    } else {
                      setSelectedItems((prev) =>
                        prev.filter((id) => id !== item.bookIsbn)
                      );
                    }
                  }}
                />
                <img
                  src={item.book?.image}
                  alt={item.book?.title}
                  className={styles.image}
                />
                <div className={styles.info}>
                  <h4>{item.book?.title}</h4>
                  <p>{item.book?.author}</p>
                  <p>{item.book?.salePrice?.toLocaleString()}원</p>
                </div>
                <button
                  onClick={() => removeItem(item.bookIsbn)}
                  className={styles.removeBtn}
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>

          {/* ✅ 선택한 항목 전체 액션 */}
          <div className={styles.bulkActions}>
            <button onClick={handleDeleteSelected}>🗑️ 선택 삭제</button>
            <button onClick={handleWishlistSelected}>💖 선택 찜하기</button>
            <button onClick={handleCheckoutSelected}>💳 선택 결제</button>
          </div>

          <div className={styles.total}>
            총 합계: <b>{total.toLocaleString()}원</b>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
