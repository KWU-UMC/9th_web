import type { Detail } from "../types/detail";

interface DetailProps {
  detail: Detail;
}

export const MovieDetailSection = ({ detail }: DetailProps) => {
  return (
    <div>
      <div className="flex">
        <div className="flex flex-col gap-2 p-5 ml-5 ">
          <h3 className="text-2xl font-extrabold mb-4">{detail.title}</h3>
          <p className="font-bold">개봉일자: {detail.release_date}</p>
          <p className="font-bold">상영시간: {detail.runtime}분</p>
          <p className="font-bold">평점: {detail.vote_average}</p>
          <p className="font-medium">{detail.overview}</p>
        </div>
        <img
          src={`https://image.tmdb.org/t/p/w200${detail.poster_path}`}
          alt={`${detail.title}의 이미지`}
          className="w-2xs h-auto rounded-lg shadow-md mx-10"
        />
      </div>
    </div>
  );
};
