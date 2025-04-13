"use client";

import React, { useState } from "react";

interface WeightInputProps {
  initialValue?: number;
  step?: number;
  unit?: string;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
  className?: string;
}

export function WeightInput({
  initialValue = 0,
  step = 5,
  unit = "lbs",
  min = 0,
  max = 1000,
  onChange,
  className = "",
}: WeightInputProps) {
  const [value, setValue] = useState(initialValue);

  const decrease = () => {
    if (value - step >= min) {
      const newValue = value - step;
      setValue(newValue);
      onChange?.(newValue);
    }
  };

  const increase = () => {
    if (value + step <= max) {
      const newValue = value + step;
      setValue(newValue);
      onChange?.(newValue);
    }
  };

  return (
    <div className={`weight-input ${className}`}>
      <button
        className="weight-button"
        onClick={decrease}
        aria-label={`Decrease weight by ${step}`}
        type="button"
      >
        -
      </button>
      <div className="weight-value">{value}</div>
      <div className="weight-unit">{unit}</div>
      <button
        className="weight-button"
        onClick={increase}
        aria-label={`Increase weight by ${step}`}
        type="button"
      >
        +
      </button>

      <style jsx>{`
        .weight-input {
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(26, 69, 52, 0.3);
          border-radius: 10px;
          padding: 0.35rem 0.5rem;
          width: 90px;
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2),
            0 1px 1px rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          position: relative;
        }

        .weight-value {
          margin: 0 0.4rem;
          font-weight: 600;
          min-width: 24px;
          text-align: center;
          font-feature-settings: "tnum";
          font-variant-numeric: tabular-nums;
          color: white;
        }

        .weight-unit {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.7);
          margin-right: 0.1rem;
        }

        .weight-button {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: linear-gradient(
            145deg,
            rgba(26, 69, 52, 0.8),
            rgba(12, 44, 29, 0.8)
          );
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          font-size: 0.9rem;
          user-select: none;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          transition: all 150ms ease;
          color: rgba(255, 255, 255, 0.9);
          border: none;
          padding: 0;
          line-height: 1;
        }

        .weight-button:hover {
          background: linear-gradient(145deg, #ff9967, #ff7440);
          transform: translateY(-1px);
          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
        }

        .weight-button:active {
          transform: translateY(1px);
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
}

export default WeightInput;
