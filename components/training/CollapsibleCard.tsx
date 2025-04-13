"use client";

import React, { useState } from "react";

interface CollapsibleCardProps {
  title: string;
  subtitle?: string;
  indicator?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function CollapsibleCard({
  title,
  subtitle,
  indicator,
  children,
  defaultOpen = false,
}: CollapsibleCardProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="week-card">
      <div
        className={`week-header ${isOpen ? "active" : ""}`}
        onClick={toggleOpen}
      >
        <div>
          <h3 className="week-title">{title}</h3>
          {subtitle && <div className="week-progress">{subtitle}</div>}
        </div>
        {indicator && <div className="week-progress">{indicator}</div>}
        <div className={`week-chevron ${isOpen ? "active" : ""}`}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 9L12 15L18 9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <div className={`week-content ${isOpen ? "active" : ""}`}>{children}</div>

      <style jsx>{`
        .week-card {
          background: linear-gradient(
            145deg,
            rgba(26, 69, 52, 0.5),
            rgba(12, 44, 29, 0.5)
          );
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: 0 15px 25px rgba(0, 0, 0, 0.2);
          margin-bottom: 1rem;
          width: 100%;
        }

        .week-header {
          padding: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          transition: all 150ms ease;
          background: linear-gradient(
            145deg,
            rgba(32, 85, 64, 0.6),
            rgba(26, 69, 52, 0.6)
          );
          color: white;
        }

        .week-header:hover {
          background: linear-gradient(
            145deg,
            rgba(38, 100, 75, 0.7),
            rgba(32, 85, 64, 0.7)
          );
        }

        .week-header.active {
          background: linear-gradient(
            145deg,
            rgba(16, 70, 45, 0.9),
            rgba(12, 55, 35, 0.9)
          );
          border-bottom: 1px solid rgba(255, 255, 255, 0.15);
        }

        .week-title {
          font-weight: 600;
          color: white;
          font-size: 1.125rem;
          margin: 0;
        }

        .week-progress {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.8);
          margin-top: 0.25rem;
        }

        .week-chevron {
          transform: rotate(0deg);
          transition: transform 200ms ease;
          color: rgba(255, 255, 255, 0.6);
        }

        .week-chevron.active {
          transform: rotate(180deg);
        }

        .week-content {
          background: rgba(6, 30, 20, 0.6);
          max-height: 0;
          overflow: hidden;
          transition: max-height 300ms ease-in-out;
        }

        .week-content.active {
          max-height: 1000px; /* Large enough to accommodate content */
        }
      `}</style>
    </div>
  );
}

export default CollapsibleCard;
