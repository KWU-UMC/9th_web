type PageButtonProps ={
  isUp: boolean;
  page: number;
  onPage: React.Dispatch<React.SetStateAction<number>>;
};

const PageButton = ({isUp, page, onPage}: PageButtonProps) => {

  return (
    <button
      className={`w-12 h-10 rounded-xl text-white shadow-lg cursor-pointer disabled:cursor-not-allowed
        ${!isUp && page === 1 ? "bg-gray-300" : "bg-purple-400 hover:bg-purple-600"}`}
      onClick={isUp ? ():void => onPage((prev) => prev + 1) : ():void => onPage((prev) => (prev - 1))}
      disabled={!isUp && page === 1}
    >
      {isUp ? '>' : '<'}
    </button>
  )
}

export default PageButton
