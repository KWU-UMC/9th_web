import { memo } from "react";

interface CountButtonProps {
  onClick: (count: number) => void;
}

const CountButton = ({ onClick }: CountButtonProps) => {
  console.log("CountButton rendered");

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

export default memo(CountButton);