import { Routes, Route } from "react-router-dom";
import BooksPage from "./pages/BooksPage/BooksPage";
import "./styles/reset.css";
import "./styles/variables.css";
import BookDetailPage from "./pages/BookDetailPage/BookDetailPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import { AuthProvider } from "./context/AuthProvider";
import MyPage from "./pages/MyPage/MyPage";
import CartPage from "./pages/CartPage/CartPage";
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage/PurchaseSuccessPage";
import EventPage from "./pages/EventPage/EventPage";
import EventDetailPage from "./pages/EventDetailPage/EventDetailPage";
import Header from "./components/Header/Header";
import BestSellerPage from "./pages/BestSellerPage/BestSellerPage";
import BestPage from "./pages/BestPage/BestPage";

function App() {
  return (
    <AuthProvider>
      <Header />
      <Routes>
        <Route path="/" element={<BooksPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/bestseller" element={<BestSellerPage />} />
        <Route path="/book/:isbn" element={<BookDetailPage />} />
        <Route path="/my" element={<MyPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/purchase" element={<PurchaseSuccessPage />} />
        <Route path="/event" element={<EventPage />} />
        <Route path="/eventdetail" element={<EventDetailPage />} />

        <Route path="/test" element={<BestPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;