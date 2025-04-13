"use client";

import React from "react";
import BackButton from "./BackButton";

interface HeaderProps {
  title: string;
  onBackClick?: () => void;
  rightElement?: React.ReactNode;
  showBackButton?: boolean;
  isFlushWithTop?: boolean;
}

export function Header({
  title,
  onBackClick,
  rightElement,
  showBackButton = true,
  isFlushWithTop = false,
}: HeaderProps) {
  const containerClass = isFlushWithTop ? "page-header" : "header";

  return (
    <div className={containerClass}>
      {showBackButton ? (
        <BackButton onClick={onBackClick || (() => window.history.back())} />
      ) : (
        <div className="empty-space" />
      )}
      <h2 className="header-title">{title}</h2>
      {rightElement ? rightElement : <div className="empty-space" />}

      <style jsx>{`
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.25rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          position: sticky;
          top: 0;
          background: linear-gradient(
            to bottom,
            rgba(26, 69, 52, 0.9),
            rgba(12, 44, 29, 0.9)
          );
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          z-index: 10;
          color: white;
        }

        .header-title {
          font-size: 1.5rem;
          font-weight: 600;
          letter-spacing: -0.02em;
          margin: 0;
          text-align: center;
          flex: 1;
        }

        .empty-space {
          width: 2.25rem;
          height: 2.25rem;
          visibility: hidden;
        }
      `}</style>
    </div>
  );
}

export default Header;
