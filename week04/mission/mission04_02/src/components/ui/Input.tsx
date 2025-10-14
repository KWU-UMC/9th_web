import React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ error, left, right, className = "", ...rest }, ref) => {
    return (
      <div>
        <div
          className={`flex items-center gap-2 rounded-md border px-3 ${
            error ? "border-red-500" : "border-gray-700"
          } bg-black`}
        >
          {left && <span className="text-gray-400">{left}</span>}
          <input
            ref={ref}              
            {...rest}
            className={`w-full p-3 bg-transparent text-sm text-white outline-none ${className}`}
          />
          {right}
        </div>
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
