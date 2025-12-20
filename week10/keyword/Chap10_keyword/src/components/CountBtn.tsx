import { memo } from "react";

interface CountBtnProps {
  onClick: (count: number) => void;
}

const CountBtn = ({ onClick }: CountBtnProps) => {
  console.log("CountBtn 렌더링됨");

  return (
    <button
      className="border p-2 rounded-sm"
      onClick={() => {
        onClick(10);
      }}
    >
      카운트 증가
    </button>
  );
};

export default memo(CountBtn);