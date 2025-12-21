import { type FormEvent, memo } from 'react';
import Input from './Input';
import LanguageSelector from './LanguageSelector';

interface MovieFilterProps {
  query: string;
  setQuery: (value: string) => void;
  language: string;
  setLanguage: (value: string) => void;
  includeAdult: boolean;
  setIncludeAdult: (value: boolean) => void;
  onSubmit: (e: FormEvent) => void;
}

const MovieFilter = ({
  query,
  setQuery,
  language,
  setLanguage,
  includeAdult,
  setIncludeAdult,
  onSubmit
}: MovieFilterProps) => {
  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* 영화 제목 입력 (Input 컴포넌트 사용) */}
          <div className="md:col-span-6">
            <Input
              label="영화 제목"
              placeholder="영화 제목을 입력하세요"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          
          {/* 언어 선택 (LanguageSelector 컴포넌트 사용) */}
          <div className="md:col-span-3">
            <LanguageSelector 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            />
          </div>

           {/* 성인 콘텐츠 체크박스 */}
           <div className="md:col-span-3 flex items-end pb-3">
            <label className="flex items-center space-x-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={includeAdult}
                onChange={(e) => setIncludeAdult(e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
              />
              <span className="text-gray-700 font-medium">성인 콘텐츠 표시</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-md"
        >
          🔍 검색하기
        </button>
      </form>
    </section>
  );
};

export default memo(MovieFilter);