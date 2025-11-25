import type { Dispatch, FormEvent, SetStateAction } from "react";

interface SearchProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

const SearchBar = ({ search, setSearch }: SearchProps) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="mt-6 flex justify-center items-center">
      <form className="w-full max-w-3xl px-4" onSubmit={handleSubmit}>
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border-b border-white/50 bg-transparent h-12 shadow p-4 text-white placeholder:text-white/60 focus:outline-none"
            placeholder="검색어를 입력해주세요."
          />
          <button
            type="submit"
            className="text-white h-5 w-5 absolute top-3.5 right-3 fill-current opacity-70"
            aria-label="검색"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56.966 56.966">
              <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
