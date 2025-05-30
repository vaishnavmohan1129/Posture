import React, { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Header    from "./components/Header";
import Sidebar   from "./components/Sidebar";
import Login     from "./components/Login";
import Home      from "./Home";
import VideoFeed from "./components/VideoFeed";

export default function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="flex h-screen">
      {/* Sidebar — hidden on /login */}
      {!isLoginPage && (
        <Sidebar
          openSidebarToggle={sidebarCollapsed}
          OpenSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      )}

      {/* Main area */}
      <div className="flex flex-col flex-1">
        {/* Header — hidden on /login */}
        {!isLoginPage && (
          <Header OpenSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
        )}

        <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          <Routes>
            {/* ---------- ROUTING ---------- */}
            {/* 1. root → /login */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* 2. public login page */}
            <Route path="/login" element={<Login />} />

            {/* 3. dashboard */}
            <Route path="/home" element={<Home />} />

            {/* 4. other private pages */}
            <Route path="/video-feed" element={<VideoFeed />} />

            {/* 5. any unknown path → /login */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
