import React from "react";
import Input from "./Input";
import { usePasswordToggle } from "../../hooks/usePasswordToggle";

type Props = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> & {
  error?: string;
};

const PasswordInput = React.forwardRef<HTMLInputElement, Props>(
  ({ error, ...rest }, ref) => {
    const { type, visible, toggle } = usePasswordToggle(false);
    return (
      <Input
        ref={ref} 
        {...rest}
        error={error}
        type={type}
        right={
          <button
            type="button"
            onClick={toggle}
            className="text-gray-300 hover:text-white"
            aria-label={visible ? "비밀번호 숨기기" : "비밀번호 보기"}
          >
            {visible ? "👁️" : "🙈"}
          </button>
        }
      />
    );
  }
);

PasswordInput.displayName = "PasswordInput";
export default PasswordInput;
