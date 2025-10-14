import { useState } from "react";
export function usePasswordToggle(defaultVisible = false) {
  const [visible, setVisible] = useState(defaultVisible);
  const type = visible ? "text" : "password";
  const toggle = () => setVisible((v) => !v);
  return { type, visible, toggle } as const;
}
