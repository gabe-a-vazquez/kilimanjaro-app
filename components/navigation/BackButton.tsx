"use client";

import React from "react";

interface BackButtonProps {
  onClick: () => void;
}

export function BackButton({ onClick }: BackButtonProps) {
  return (
    <button className="back-button" onClick={onClick} aria-label="Go back">
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15 19L8 12L15 5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <style jsx>{`
        .back-button {
          width: 2.25rem;
          height: 2.25rem;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          color: white;
          transition: all 150ms ease;
          background: linear-gradient(
            145deg,
            rgba(26, 69, 52, 0.7),
            rgba(12, 44, 29, 0.7)
          );
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3),
            inset 0 1px 1px rgba(255, 255, 255, 0.1);
          border: none;
        }

        .back-button:hover {
          background: linear-gradient(
            145deg,
            hsla(146, 50%, 35%, 0.8),
            hsla(146, 50%, 30%, 0.8)
          );
        }

        .back-button:active {
          background: linear-gradient(
            145deg,
            hsla(146, 50%, 28%, 0.8),
            hsla(146, 50%, 32%, 0.8)
          );
          box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.2),
            inset -2px -2px 5px rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </button>
  );
}

export default BackButton;
