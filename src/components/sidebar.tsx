import React from "react";
import { Link } from "react-router-dom";
import Bar from "./icons/bar";
import Plus from "./icons/plus";
import Logo from "./icons/logo";
import Moon from "./icons/moon";

const Sidebar: React.FC = () => {
  return (
    <aside className="h-screen fixed bg-gray-100 flex flex-col w-60 lg:w-240">
      <div className="p-6">
        <div className="flex items-center space-x-2 font-bold text-gray-800 text-lg">
          <Link to="/chat-interface" className="flex-shrink-0">
            <Logo />
          </Link>
          <div className="flex-grow"></div>
          <Bar />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <Link
          to="/chat-interface"
          className="flex items-center text-gray-700 text-base"
        >
          <Plus className="mr-2" />
          New Prompt
        </Link>

        {Array.from({ length: 0 }).map((_, index) => (
          <Link
            key={index}
            to={`/item-${index}`}
            className="mt-4 flex items-center text-gray-700 text-base"
          >
            <Plus className="mr-2" />
            Item {index + 1}
          </Link>
        ))}
      </div>
      <div className="py-4 pl-6">
        <button className="flex items-center space-x-2 text-gray-800 font-Inter text-[14]">
          <Moon />
          <span>Switch to dark mode</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
