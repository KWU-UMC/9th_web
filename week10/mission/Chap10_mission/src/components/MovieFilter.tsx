import type { MovieFilters } from "../types/movie";
import { useState, memo } from "react";
import { Input } from "../components/Input";
import { SelectBox } from "../components/SelectBox";
import { LanguageSelector } from "../components/LanguageSelector";
import { LANGUAGE_OPTIONS } from "../constants/movie";

interface MovieFilterProps {
  onChange: (filter: MovieFilters) => void;
}

const MovieFilter = ({ onChange }: MovieFilterProps) => {
  // 검색어
  const [query, setQuery] = useState<string>("");
  // 성인 콘텐츠 표시 여부
  const [includeAdult, setIncludeAdult] = useState<boolean>(false);
  // 언어 선택
  const [language, setLanguage] = useState("ko-KR");

  const handleSubmit = (e: React.FormEvent) => {
    // form은 기본적으로 submit 시 페이지를 새로고침
    // React에서는 e.preventDefault()로 그 기본 동작을 막고, handleSubmit 로직만 실행
    e.preventDefault();
    const filters: MovieFilters = {
      query,
      include_adult: includeAdult,
      language,
    };
    console.log(filters);
    onChange(filters);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="transform space-y-6 rounded-2xl border-gray-500 bg-white 
    p-6 m-5 shadow-xl transition-all hover:shadow-2xl"
    >
      <div className="flex flex-wrap gap-6">
        <div className="min-w-[450px] flex-1">
          <label className="mb-2 block text-sm font-bold text-gray-700">
            🎬영화 제목
          </label>
          <Input value={query} onChange={setQuery}></Input>
        </div>

        <div className="min-w-[250px] flex-1">
          <label className="mb-2 block text-sm font-bold text-gray-700">
            ⚙옵션
          </label>
          <SelectBox
            checked={includeAdult}
            onChange={setIncludeAdult}
            label="성인 콘텐츠 표시"
            id="include_adult"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 
            shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="min-w-[250px] flex-1">
          <label className="mb-2 block text-sm font-bold text-gray-700">
            🌐언어
          </label>
          <LanguageSelector
            value={language}
            onChange={setLanguage}
            options={LANGUAGE_OPTIONS}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 
            shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="w-full items-center justify-center">
          <button
            type="submit"
            className="w-full bg-blue-500 rounded-md p-2 text-white text-lg font-bold"
          >
            🔍검색하기
          </button>
        </div>
      </div>
    </form>
  );
};

export default memo(MovieFilter);
