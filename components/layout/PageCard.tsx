"use client";

import React from "react";

interface PageCardProps {
  children: React.ReactNode;
}

export function PageCard({ children }: PageCardProps) {
  return (
    <div className="page-card">
      {children}
      <style jsx>{`
        .page-card {
          display: flex;
          flex-direction: column;
          background: linear-gradient(180deg, #1a4534, #0c2c1d);
          color: white;
          border-radius: 12px;
          padding: 24px;
          width: 100%;
          max-width: 1200px;
          min-height: 80vh;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
          overflow: hidden;
          position: relative;
        }

        @media (max-width: 768px) {
          .page-card {
            padding: 16px;
            border-radius: 8px;
            min-height: auto;
          }
        }
      `}</style>
    </div>
  );
}

export default PageCard;
