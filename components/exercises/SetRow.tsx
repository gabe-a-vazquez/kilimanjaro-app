"use client";

import React, { ReactNode } from "react";

interface SetDetail {
  label: string;
  value: string | number;
}

interface SetRowProps {
  setNumber: number;
  details: SetDetail[];
  rightElement?: ReactNode;
  className?: string;
}

export function SetRow({
  setNumber,
  details,
  rightElement,
  className = "",
}: SetRowProps) {
  return (
    <div className={`set-row ${className}`}>
      <div className="set-label">Set {setNumber}</div>
      <div className="set-details">
        {details.map((detail, index) => (
          <div className="set-detail" key={index}>
            <div className="set-detail-label">{detail.label}</div>
            <div className="set-detail-value">{detail.value}</div>
          </div>
        ))}
        {rightElement && rightElement}
      </div>

      <style jsx>{`
        .set-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 8px;
          margin-bottom: 0.75rem;
        }

        .set-row:last-child {
          margin-bottom: 0;
        }

        .set-label {
          font-weight: 500;
          color: rgba(255, 255, 255, 0.9);
          min-width: 3.5rem;
        }

        .set-details {
          display: flex;
          gap: 1rem;
          align-items: center;
          flex-wrap: wrap;
        }

        .set-detail {
          text-align: center;
          min-width: 60px;
        }

        .set-detail-label {
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0.6);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 0.2rem;
        }

        .set-detail-value {
          font-weight: 600;
          font-size: 0.95rem;
          font-feature-settings: "tnum";
          font-variant-numeric: tabular-nums;
        }
      `}</style>
    </div>
  );
}

export default SetRow;
