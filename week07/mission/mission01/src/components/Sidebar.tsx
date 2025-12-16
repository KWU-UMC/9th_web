// src/components/Sidebar.tsx
import { NavLink } from "react-router-dom";
import {
  MagnifyingGlassIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import type { ElementType } from "react";

const cx = (...c: Array<string | false | null | undefined>) =>
  c.filter(Boolean).join(" ");

type Props = {
  open: boolean;
};

export default function Sidebar({ open }: Props) {
  const Item = (to: string, label: string, Icon: ElementType) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cx(
          "flex items-center gap-3 px-4 py-3 rounded-xl text-sm",
          isActive ? "bg-gray-900/10 font-semibold" : "hover:bg-gray-900/5"
        )
      }
    >
      <Icon className="w-5 h-5" />
      <span className="transition-opacity">{label}</span>
    </NavLink>
  );

  return (
    <aside
      className={cx(
        "border-r border-gray-200 bg-white transition-[width] duration-200 overflow-hidden",
        open ? "w-64" : "w-0"
      )}
      aria-hidden={!open}
    >
      <div className={cx("p-3 space-y-1", open ? "opacity-100" : "opacity-0 pointer-events-none")}>
        {Item("/search", "찾기", MagnifyingGlassIcon)}
        {Item("/my", "마이페이지", UserCircleIcon)}
      </div>
    </aside>
  );
}
