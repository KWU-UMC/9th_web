import { useCustomFetch } from "./hooks/useCustomFetch2";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

interface User {
  id: number;
  name: string;
  email: string;
}

function App() {
  const [userId, setUserId] = useState<number>(1);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const handleChangeUser = () => {
    const randomId = Math.floor(Math.random() * 10) + 1;
    setUserId(randomId);
  };

  const handleTestRetry = () => {
    setUserId(999999);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ padding: "20px" }}>
        <div
          style={{
            marginBottom: "20px",
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={handleChangeUser}
            className="bg-amber-200 rounded-md px-2 py-1 font-bold"
          >
            다른 사용자 불러오기
          </button>
          <button
            onClick={() => setIsVisible(!isVisible)}
            className="bg-amber-400 rounded-md px-2 py-1 font-bold"
          >
            컴포넌트 토글 (언마운트 테스트)
          </button>
          <button
            onClick={handleTestRetry}
            className="bg-red-400 rounded-md px-2 py-1 font-bold"
          >
            재시도 테스트 (404 에러)
          </button>
        </div>

        {isVisible && <UserDataDisplay userId={userId} />}
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;

const UserDataDisplay = ({ userId }: { userId: number }) => {
  const { data, isPending, isError } = useCustomFetch<User>(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );

  if (isPending) {
    return <div>Loading... (User ID: {userId})</div>;
  }

  if (isError) {
    return <div>Error Occurred</div>;
  }

  return (
    <div>
      <h1>{data?.name}</h1>
      <p>{data?.email}</p>
      <p style={{ fontSize: "12px", color: "#666" }}>User ID: {data?.id}</p>
    </div>
  );
};
