import { useEffect, useRef, memo } from 'react';
import type { Movie } from '../types/movie';
import MovieDetail from './MovieDetail';

interface MovieDetailModalProps {
  movie: Movie;
  onClose: () => void;
}

const MovieDetailModal = ({ movie, onClose }: MovieDetailModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // 모달 외부 클릭 시 닫기 로직
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4 animate-fadeIn">
      <div ref={modalRef} className="w-full max-w-2xl">
        {/* 내부 콘텐츠는 MovieDetail 컴포넌트에 위임 */}
        <MovieDetail movie={movie} onClose={onClose} />
      </div>
    </div>
  );
};

export default memo(MovieDetailModal);