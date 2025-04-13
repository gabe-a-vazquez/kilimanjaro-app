"use client";

import React from "react";
import PageCard from "./PageCard";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="app-layout">
      <PageCard>{children}</PageCard>
      <style jsx>{`
        .app-layout {
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          width: 100%;
          padding: 20px;
        }
      `}</style>
    </div>
  );
}

export default AppLayout;
