import React from "react";
import { NavLink } from "react-router-dom";
import {
  BsFillArchiveFill,
  BsGrid1X2Fill,
  BsFillGrid3X3GapFill,
  BsFillBellFill,
  BsMenuButtonWideFill,
  BsFillGearFill,
  BsPersonArmsUp,
} from "react-icons/bs";

const Sidebar = ({ openSidebarToggle, OpenSidebar }) => {
  // If collapsed, center icons; otherwise, show icon with gap.
  const linkClasses = openSidebarToggle
    ? "flex items-center justify-center"
    : "flex items-center gap-3";

  // Base styling for each navigation link.
  const navLinkBase =
    "hover:bg-gray-800 rounded-md p-3 transition-all duration-300";

  return (
    <aside
      id="sidebar"
      className={`bg-gray-900 text-white h-screen p-5 transition-all duration-300 ${
        openSidebarToggle ? "w-max" : "w-64"
      } flex flex-col justify-between`}
    >
      <div>
        {/* Sidebar Title */}
        <div className="flex items-center justify-center gap-3 pb-3 border-b border-gray-700">
          <BsPersonArmsUp className="text-3xl" />
          {!openSidebarToggle && (
            <span className="text-lg font-semibold">Posture-Corrector</span>
          )}
        </div>

        {/* Sidebar Navigation */}
        <ul className="mt-5 space-y-3">
          <li>
            <NavLink
              to="/home"
              className={({ isActive }) =>
                `${navLinkBase} ${linkClasses} ${isActive ? "bg-gray-700" : ""}`
              }
            >
              <BsGrid1X2Fill className="text-xl" />
              {!openSidebarToggle && <span>Dashboard</span>}
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/video-feed"
              className={({ isActive }) =>
                `${navLinkBase} ${linkClasses} ${isActive ? "bg-gray-700" : ""}`
              }
            >
              <BsFillArchiveFill className="text-xl" />
              {!openSidebarToggle && <span>Posture Detection</span>}
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/recommendation"
              className={({ isActive }) =>
                `${navLinkBase} ${linkClasses} ${isActive ? "bg-gray-700" : ""}`
              }
            >
              <BsFillGrid3X3GapFill className="text-xl" />
              {!openSidebarToggle && <span>Recommendation</span>}
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/alerts"
              className={({ isActive }) =>
                `${navLinkBase} ${linkClasses} ${isActive ? "bg-gray-700" : ""}`
              }
            >
              <BsFillBellFill className="text-xl" />
              {!openSidebarToggle && <span>Alerts</span>}
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/reports"
              className={({ isActive }) =>
                `${navLinkBase} ${linkClasses} ${isActive ? "bg-gray-700" : ""}`
              }
            >
              <BsMenuButtonWideFill className="text-xl" />
              {!openSidebarToggle && <span>Reports</span>}
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Settings link positioned at bottom */}
      <div className="mt-5">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `${navLinkBase} ${linkClasses} ${isActive ? "bg-gray-700" : ""}`
          }
        >
          <BsFillGearFill className="text-xl" />
          {!openSidebarToggle && <span>Settings</span>}
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
