import { memo } from "react";

interface TextBtnProps {
  onChange: (text: string) => void;
}

const TextBtn = ({ onChange }: TextBtnProps) => {
  console.log("TextBtn 렌더링됨");

  return (
    <input
      type="text"
      className="border p-2 rounded-sm"
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default memo(TextBtn);