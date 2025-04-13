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
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          width: 100%;
          padding: 20px;
          background: linear-gradient(135deg, #0a2e1e, #061f15);
        }
      `}</style>
    </div>
  );
}

export default AppLayout;
