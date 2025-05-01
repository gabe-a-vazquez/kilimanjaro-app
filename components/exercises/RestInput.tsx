"use client";

import React, { useState, ChangeEvent } from "react";
import { useExerciseContext } from "./ExerciseCard";

interface RestInputProps {
  initialValue?: number;
  onChange?: (value: number) => void;
  className?: string;
}

export function RestInput({
  initialValue = 0,
  onChange,
  className = "",
}: RestInputProps) {
  const [value, setValue] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);
  const { isCompleted } = useExerciseContext();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (isCompleted) return;

    const newValue = Math.min(Math.max(Number(e.target.value), 0), 300); // Max 5 minutes (300 seconds)
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
    <div className={`rest-input ${className} ${isCompleted ? "disabled" : ""}`}>
      <input
        type="number"
        value={displayValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        min={0}
        max={300}
        disabled={isCompleted}
        className="rest-value-input"
      />
      <div className="rest-unit">sec</div>

      <style jsx>{`
        .rest-input {
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(26, 69, 52, 0.3);
          border-radius: 10px;
          padding: 0.35rem 0.5rem;
          width: 75px;
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2),
            0 1px 1px rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          position: relative;
        }

        .rest-input.disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .rest-value-input {
          width: 35px;
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

        .rest-value-input::-webkit-outer-spin-button,
        .rest-value-input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        .rest-value-input:disabled {
          cursor: not-allowed;
        }

        .rest-value-input:focus {
          outline: none;
        }

        .rest-unit {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.7);
          margin-left: 0.4rem;
        }
      `}</style>
    </div>
  );
}

export default RestInput;
