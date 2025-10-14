import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className="absolute top-6 left-6 text-2xl text-gray-400 hover:text-white"
      aria-label="뒤로 가기"
      title="뒤로 가기"
    >
      &lt;
    </button>
  );
}
