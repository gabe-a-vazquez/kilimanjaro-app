"use client";

import React, { ReactNode } from "react";

export type StatusType = "completed" | "upcoming" | "today";

interface StatusIndicatorProps {
  status: StatusType;
  size?: "small" | "medium" | "large";
  children?: ReactNode;
}

export function StatusIndicator({
  status,
  size = "medium",
  children,
}: StatusIndicatorProps) {
  // Size mapping in rems
  const sizeMap = {
    small: 1.5,
    medium: 2,
    large: 2.5,
  };

  return (
    <div className={`status-indicator status-${status} size-${size}`}>
      {children}
      <style jsx>{`
        .status-indicator {
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-shrink: 0;
        }

        .size-small {
          width: ${sizeMap.small}rem;
          height: ${sizeMap.small}rem;
          font-size: 0.6rem;
        }

        .size-medium {
          width: ${sizeMap.medium}rem;
          height: ${sizeMap.medium}rem;
          font-size: 0.75rem;
        }

        .size-large {
          width: ${sizeMap.large}rem;
          height: ${sizeMap.large}rem;
          font-size: 0.9rem;
        }

        .status-completed {
          background: linear-gradient(145deg, #3a9d6b, #1f5a3d);
          color: white;
          box-shadow: 0 0 15px rgba(58, 157, 107, 0.3);
        }

        .status-upcoming {
          border: 2px solid rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.05);
          box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.05);
          color: rgba(255, 255, 255, 0.6);
        }

        .status-today {
          border: none;
          background: linear-gradient(145deg, #ff9967, #ff7440);
          color: white;
          box-shadow: 0 0 15px rgba(255, 127, 80, 0.4);
          animation: pulse-border 1.5s infinite;
        }

        @keyframes pulse-border {
          0% {
            box-shadow: 0 0 0 0 rgba(255, 127, 80, 0.5);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(255, 127, 80, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(255, 127, 80, 0);
          }
        }
      `}</style>
    </div>
  );
}

export default StatusIndicator;
