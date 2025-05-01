"use client";

import React, { useState, ChangeEvent } from "react";
import { useExerciseContext } from "./ExerciseCard";

interface RepsInputProps {
  initialValue?: number;
  onChange?: (value: number) => void;
  className?: string;
}

export function RepsInput({
  initialValue = 0,
  onChange,
  className = "",
}: RepsInputProps) {
  const [value, setValue] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);
  const { isCompleted } = useExerciseContext();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (isCompleted) return;

    const newValue = Math.min(Math.max(Number(e.target.value), 0), 100); // Reasonable max for reps
    setValue(newValue);
    onChange?.(newValue);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const displayValue = isFocused && value === 0 ? "" : value;

  return (
    <div className={`reps-input ${className} ${isCompleted ? "disabled" : ""}`}>
      <input
        type="number"
        value={displayValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        min={0}
        max={100}
        disabled={isCompleted}
        className="reps-value-input"
      />
      <div className="reps-unit">reps</div>

      <style jsx>{`
        .reps-input {
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

        .reps-input.disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .reps-value-input {
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

        .reps-value-input::-webkit-outer-spin-button,
        .reps-value-input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        .reps-value-input:disabled {
          cursor: not-allowed;
        }

        .reps-value-input:focus {
          outline: none;
        }

        .reps-unit {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.7);
          margin-left: 0.4rem;
        }
      `}</style>
    </div>
  );
}

export default RepsInput;
