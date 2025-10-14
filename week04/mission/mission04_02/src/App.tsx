import { Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

function HomePage() {
  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">홈 화면</h1>
      <div className="flex gap-3">
        <Link to="/login" className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600">로그인</Link>
        <Link to="/signup" className="px-4 py-2 rounded-md bg-pink-500 hover:bg-pink-600">회원가입</Link>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} /> {/* ✅ */}
    </Routes>
  );
}
