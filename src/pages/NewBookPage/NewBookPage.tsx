import LayoutFilter from "../../components/LayoutFilter/LayoutFilter";
import BookRow from "../../components/BookRow/BookRow";
import BookTile from "../../components/BookTile/BookTile";
import styles from "./NewBookPage.module.css";
import { books } from "../../data/books";
import { useState } from "react";
import NewBookSidebar from "../../components/NewBookSidebar/NewBookSidebar";
import Sidebar from "../../components/Sidebar/Sidebar";
import NewLayoutFilter from "../../components/NewLayoutFilter/NewLayoutFilter";
import NewBookRow from "../../components/NewBookRow/NewBookRow";
import NewBookTile from "../../components/NewBookTile/NewBookTile";

export default function NewBook() {
    const [view, setView] = useState<"list" | "card">("list");

    return (
        <>
        <div className={styles.container}>
            <h2 className={styles.title}>신상품</h2>
        <div className={styles.line} />
        </div>
        <NewBookSidebar />
        <NewLayoutFilter view={view} onChange={(m) => setView(m)} />

        <div className={styles.bookList}>
        {view === "list" && (
          <>
            {/* 첫 번째 책(1위) */}
            {books.length > 0 && <NewBookRow key={books[0].id} book={books[0]} rank={1} />}

            {/* 2위 이하(최대 10개) */}
            {books.length > 1 &&
              books.slice(1, Math.min(books.length, 11)).map((book, i) => (
                <NewBookRow key={book.id} book={book} rank={i + 2} />
              ))}
          </>
        )}

        {view === "card" && (
          <div className={styles.tileGrid}>
            {books.slice(0, 10).map((book, i) => (
              <NewBookTile key={book.id} book={book} rank={i + 1} />
            ))}
          </div>
        )}
      </div>
        </>
    )
}