type CreditsCardProps = {
  profile_path: string | undefined | null;
  name: string | undefined;
  original_name: string | undefined;
}

const CreditsCard = ({profile_path, name, original_name}: CreditsCardProps) => {
  return (
    <li className="m-2">
      <img
        src={`https://image.tmdb.org/t/p/w92${profile_path}`}
        alt={original_name}
        className="rounded-md"
      />
      <p className="font-bold">{name}</p>
      <p className="text-sm">{original_name}</p>
    </li>
  )
}

export default CreditsCard
