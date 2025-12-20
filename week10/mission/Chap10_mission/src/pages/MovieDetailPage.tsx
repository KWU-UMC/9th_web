import { useParams } from "react-router-dom";

export const MovieDetailPage = () => {
  const { movieId } = useParams<{ movieId: string }>();
  return (
    <div className="flex flex-col items-center">
      <h1>영화 상세페이지</h1>
      <h1>{movieId}번 영화 상세페이지</h1>
    </div>
  );
};
