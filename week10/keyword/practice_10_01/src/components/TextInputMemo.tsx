interface TextBtnProps {
  onChange: (text: string) => void;
}

const TextInput = ({ onChange }: TextBtnProps) => {
  return (
    <input
      type="text"
      className="border p-4 rounded-sm"
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default TextInput;