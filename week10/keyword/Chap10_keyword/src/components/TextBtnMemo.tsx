interface TextBtnProps {
  onChange: (text: string) => void;
}

const TextBtn = ({ onChange }: TextBtnProps) => {
  return (
    <input
      type="text"
      className="border p-2 rounded-sm"
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default TextBtn;