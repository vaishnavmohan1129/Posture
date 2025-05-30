import React from "react";
import {
  BsFillBellFill,
  BsFillEnvelopeFill,
  BsPersonCircle,
  BsSearch,
  BsJustify,
} from "react-icons/bs";

const Header = ({ OpenSidebar }) => {
  return (
    <header className="flex items-center justify-between bg-gray-900 text-white py-3 px-6 shadow-md">
      {/* Left section with sidebar toggle and title */}
      <div className="flex items-center space-x-3">
        <button
          onClick={OpenSidebar}
          className="p-2 hover:bg-gray-800 rounded"
        >
          <BsJustify className="text-2xl" />
        </button>
        <h1 className="text-2xl font-bold">Posture Detection App</h1>
      </div>

      {/* Center section with search input and icon */}
      <div className="flex items-center space-x-2 w-full max-w-xs">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search..."
            className="w-full py-2 pl-10 pr-4 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <BsSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-400" />
        </div>
      </div>

      {/* Right section with notification, email, and profile icons */}
      <div className="flex items-center space-x-4">
        <button className="p-2 hover:bg-gray-800 rounded">
          <BsFillBellFill className="text-xl" />
        </button>
        <button className="p-2 hover:bg-gray-800 rounded">
          <BsFillEnvelopeFill className="text-xl" />
        </button>
        <button className="p-2 hover:bg-gray-800 rounded">
          <BsPersonCircle className="text-xl" />
        </button>
      </div>
    </header>
  );
};

export default Header;
