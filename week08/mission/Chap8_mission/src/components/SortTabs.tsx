import { useState } from "react";
import { PAGINATION_ORDER } from "../enums/common";

interface SortTabsProps {
  setSort: (order: PAGINATION_ORDER) => void;
}

const SortTabs= ({ setSort }: SortTabsProps) => {
  const tabs = [
    { label: "최신순", value: PAGINATION_ORDER.desc },
    { label: "오래된순", value: PAGINATION_ORDER.asc },
  ];

  const [activeTab, setActiveTab] = useState("최신순");

  const handleClick = (label: string, value: PAGINATION_ORDER) => {
    setActiveTab(label);
    setSort(value);
  };

  return (
    <div className="flex justify-center mt-5">
      <nav className="flex m-3 overflow-x-auto items-center p-1 space-x-1 rtl:space-x-reverse text-sm text-gray-600 bg-gray-500/5 rounded-xl dark:bg-gray-500/20">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            role="tab"
            type="button"
            aria-selected={activeTab === tab.label}
            onClick={() => handleClick(tab.label, tab.value)}
            className={`flex whitespace-nowrap items-center h-8 px-5 font-semibold rounded-lg outline-none focus:ring-2 focus:ring-blue-600 focus:ring-inset 
            ${
              activeTab === tab.label
                ? "text-blue-700 shadow bg-white dark:text-white dark:bg-blue-600"
                : "hover:text-gray-300 focus:text-blue-600 dark:text-gray-400 dark:hover:text-gray-300 dark:focus:text-gray-400"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default SortTabs;