import { useParams, useNavigate } from 'react-router-dom';

const MovieDetail = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold mb-4">영화 상세 페이지</h1>
      <p className="text-xl mb-8">영화 ID: {movieId}</p>
      <button 
        onClick={() => navigate('/')}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        홈으로 돌아가기
      </button>
    </div>
  );
};

export default MovieDetail;