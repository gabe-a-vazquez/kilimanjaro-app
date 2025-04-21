"use client";

import React, { useState, ChangeEvent } from "react";
import { useExerciseContext } from "./ExerciseCard";

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
  const { isCompleted } = useExerciseContext();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (isCompleted) return;

    const newValue = Math.min(Math.max(Number(e.target.value), min), max);
    setValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div
      className={`weight-input ${className} ${isCompleted ? "disabled" : ""}`}
    >
      <input
        type="number"
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
        step={step}
        disabled={isCompleted}
        className="weight-value-input"
      />
      <div className="weight-unit">{unit}</div>

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

        .weight-input.disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .weight-value-input {
          width: 45px;
          background: transparent;
          border: none;
          color: white;
          font-weight: 600;
          text-align: center;
          font-feature-settings: "tnum";
          font-variant-numeric: tabular-nums;
          padding: 0;
          -moz-appearance: textfield;
        }

        .weight-value-input::-webkit-outer-spin-button,
        .weight-value-input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        .weight-value-input:disabled {
          cursor: not-allowed;
        }

        .weight-value-input:focus {
          outline: none;
        }

        .weight-unit {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.7);
          margin-left: 0.4rem;
        }
      `}</style>
    </div>
  );
}

export default WeightInput;
