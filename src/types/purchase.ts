import type { Book } from "./books";

export interface Purchase {
  _id: string;
  userId: string;
  bookIsbn: string;
  createdAt?: string;
  book: Book;
}
