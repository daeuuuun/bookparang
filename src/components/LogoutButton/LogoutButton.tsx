import React from "react";
import axios from "axios";
import { useAuth } from "../../context/useAuth"; // ✅ 로그인 상태 context

const LogoutButton: React.FC = () => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    if (window.confirm("정말 로그아웃하시겠습니까?")) {
      try {
        await axios.post("http://localhost:4000/api/users/logout", {}, { withCredentials: true });
        logout(); // ✅ context 상태에서도 로그인 해제
        alert("로그아웃되었습니다!");
        window.location.href = "/"; // ✅ 홈으로 이동
      } catch (err) {
        console.error("❌ 로그아웃 실패:", err);
        alert("로그아웃 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <button onClick={handleLogout} style={{ cursor: "pointer" }}>
      로그아웃
    </button>
  );
};

export default LogoutButton;
