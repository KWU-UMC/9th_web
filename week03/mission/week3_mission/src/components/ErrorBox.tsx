type Props = { message: string };
export default function ErrorBox({ message }: Props) {
  return (
    <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
      {message}
    </div>
  );
}
