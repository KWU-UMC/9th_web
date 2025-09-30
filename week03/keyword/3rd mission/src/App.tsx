import { useEffect, useState } from "react";

const routes: Record<string, JSX.Element> = {
  "/": <h1>홈 화면</h1>,
  "/about": <h1>소개 화면</h1>,
  "/contact": <h1>연락처 화면</h1>,
};

export default function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigate = (to: string) => {
    window.history.pushState({}, "", to);
    setPath(to);
  };

  return (
    <div>
      <nav>
        <button onClick={() => navigate("/")}>홈</button>
        <button onClick={() => navigate("/about")}>소개</button>
        <button onClick={() => navigate("/contact")}>연락처</button>
      </nav>
      <main>{routes[path] ?? <h1>404 - 페이지 없음</h1>}</main>
    </div>
  );
}
