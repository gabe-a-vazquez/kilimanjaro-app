"use client";

import React from "react";
import StatusIndicator, { StatusType } from "./StatusIndicator";

interface WorkoutRowProps {
  day: string;
  type: string;
  summary: string;
  status: StatusType;
  onClick?: () => void;
}

export function WorkoutRow({
  day,
  type,
  summary,
  status,
  onClick,
}: WorkoutRowProps) {
  return (
    <div className="workout-row" onClick={onClick}>
      <StatusIndicator status={status}>
        {status === "completed" ? (
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 12L10 17L19 8"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : status === "today" ? (
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 12H12.01"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : null}
      </StatusIndicator>
      <div className="workout-info">
        <div className="day-indicator">{day}</div>
        <div className="workout-type">{type}</div>
        <div className="workout-summary">{summary}</div>
      </div>
      <div className="right-chevron">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 5L15 12L9 19"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <style jsx>{`
        .workout-row {
          padding: 1rem;
          display: flex;
          align-items: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          transition: all 150ms ease;
          color: white;
          cursor: pointer;
        }

        .workout-row:hover {
          background: rgba(32, 85, 64, 0.2);
        }

        .workout-row:last-child {
          border-bottom: none;
        }

        .workout-info {
          flex: 1;
          padding: 0 0.5rem;
          margin-left: 0.75rem;
        }

        .day-indicator {
          font-size: 0.75rem;
          color: #ff9967;
          margin-bottom: 0.25rem;
          font-weight: 500;
        }

        .workout-type {
          font-weight: 600;
          margin-bottom: 0.125rem;
          color: white;
        }

        .workout-summary {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .right-chevron {
          color: rgba(255, 255, 255, 0.5);
          margin-left: 0.5rem;
          flex-shrink: 0;
        }
      `}</style>
    </div>
  );
}

export default WorkoutRow;
