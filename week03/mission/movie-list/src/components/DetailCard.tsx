type DetailCardProps ={
  title: string | undefined;
  vote_average: number | undefined;
  released_year: string | undefined;
  runtime: number | undefined;
  overview: string | undefined;
  poster_path: string | undefined | null;
}

const DetailCard = ({title, vote_average, released_year, runtime, overview, poster_path}: DetailCardProps) => {
  return (
    <div className='flex gap-10 mb-10'>
        <div>
          <h1 className='text-3xl font-bold mb-4'>{title}</h1>
          <p>평균 {vote_average}</p>
          <p>{released_year}</p>
          <p>{runtime}분</p>
          <p className='mt-4 text-sm'>{overview}</p>
        </div>
        <img 
          src={`https://image.tmdb.org/t/p/w185${poster_path}`} 
          alt={title}
        />
      </div>
  )
}

export default DetailCard
