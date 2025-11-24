import { forwardRef } from "react";

type Props = {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const HamburgerButton = forwardRef<HTMLButtonElement, Props>(
  ({ onClick }, ref) => {
    return (
      <button
        ref={ref}
        onClick={(e) => {
          e.stopPropagation();
          onClick(e);
        }}
        className="text-gray-100 hover:text-gray-400"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    );
  }
);

export default HamburgerButton;