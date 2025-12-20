interface SelectBoxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  id?: string;
  className?: string;
}

export const SelectBox = ({
  checked,
  onChange,
  label,
  id = "checkbox",
  className,
}: SelectBoxProps) => {
  return (
    <div className={`flex items-center rounded-md border-gray-300 shadow-sm p-2 ${className}`}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="size-4   text-blue-600 focus:ring-blue-500"
      />
      <label htmlFor={id} className="ml-2 text-gray-700">{label}</label>
    </div>
  );
};