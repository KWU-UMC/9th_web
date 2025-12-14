import { useMemo, useState } from "react";
import TextInput from "../components/TextInput";
import { findPrimeNumbers } from "../utils/findPrimeNumbers";

export default function UseMemoPage() {
  const [limit, setLimit] = useState<number>(0);
  const [text, setText] = useState<string>("");

  const handleChangeText = (text: string): void => {
    setText(text);
  };
  const primes = useMemo(() => findPrimeNumbers(limit), [limit]);
  return (
    <div className="flex flex-col gap-4">
      <h1>3번 예제 배운 후에 useMemo</h1>
      <label>
        <span>상한 수치 찾기 :</span>
        <input
          type="number"
          value={limit}
          className="border p-4 rounded-lg"
          onChange={(e): void => setLimit(Number(e.target.value))}
        />
      </label>

      <h2>소수리스트</h2>
      <div>
        {primes.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      <label>
        <span>텍스트 :</span>
        <TextInput onChange={handleChangeText} />
      </label>
    </div>
  );
}
