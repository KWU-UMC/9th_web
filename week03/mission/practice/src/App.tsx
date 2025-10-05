import { useState, useEffect } from "react";

// 페이지 컴포넌트들
const HomePage = () => <h1 className="text-white text-4xl">홈 페이지</h1>;
const AboutPage = () => <h1 className="text-white text-4xl">소개 페이지</h1>;
const ContactPage = () => (
  <h1 className="text-white text-4xl">연락처 페이지</h1>
);

const App = () => {
  // 현재 경로 상태 관리
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    // 뒤로/앞으로 가기 감지
    const handlePopState = () => {
      setPath(window.location.pathname);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // 페이지 이동 함수
  const navigate = (newPath: string) => {
    window.history.pushState(null, "", newPath);
    setPath(newPath);
  };

  // 현재 경로에 맞는 페이지 렌더링
  let CurrentPage = HomePage;
  if (path === "/about") CurrentPage = AboutPage;
  if (path === "/contact") CurrentPage = ContactPage;

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      {/* 네비게이션 */}
      <nav className="mb-8 flex gap-4">
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          홈
        </button>
        <button
          onClick={() => navigate("/about")}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          소개
        </button>
        <button
          onClick={() => navigate("/contact")}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          연락처
        </button>
      </nav>

      {/* 현재 페이지 */}
      <CurrentPage />

      <div className="mt-8 p-4 bg-gray-800 rounded text-white text-sm">
        <p>현재 경로: {path}</p>
      </div>
    </div>
  );
};

export default App;
