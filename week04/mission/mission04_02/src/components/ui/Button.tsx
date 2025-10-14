type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ disabled, className = "", ...rest }: Props) {
  const base = "w-full py-3 rounded-md font-bold transition disabled:cursor-not-allowed";
  const theme = disabled ? "bg-gray-700 text-gray-400" : "bg-pink-500 hover:bg-pink-600 text-white";
  return <button disabled={disabled} className={`${base} ${theme} ${className}`} {...rest} />;
}
