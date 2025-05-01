"use client";

import React, { useState, ChangeEvent, useEffect } from "react";
import { useExerciseContext } from "./ExerciseCard";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface WeightInputProps {
  initialValue?: number;
  step?: number;
  unit?: string;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
  className?: string;
  exerciseId?: number;
}

export function WeightInput({
  initialValue = 0,
  unit = "lbs",
  min = 0,
  max = 1000,
  onChange,
  className = "",
  exerciseId,
}: WeightInputProps) {
  const [value, setValue] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);
  const { isCompleted } = useExerciseContext();
  const supabase = createClientComponentClient();
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    const fetchHeaviestWeight = async () => {
      const exerciseIdNumber =
        typeof exerciseId === "string" ? parseInt(exerciseId) : exerciseId;

      // Skip if no exerciseId, already completed, already has a value, or already fetched
      if (!exerciseIdNumber || isCompleted || initialValue > 0 || hasFetched) {
        return;
      }

      try {
        // First get all workout_exercise_ids for this exercise
        const { data: workoutExercises, error: workoutError } = await supabase
          .from("workout_exercises")
          .select("id")
          .eq("exercise_id", exerciseIdNumber);

        if (workoutError) {
          console.error("Error fetching workout exercises:", workoutError);
          return;
        }

        const workoutExerciseIds = workoutExercises.map((we) => we.id);

        // Then get the heaviest weight from completed sets for these workout exercises
        const { data, error } = await supabase
          .from("exercise_sets")
          .select("weight")
          .eq("is_completed", true)
          .in("workout_exercise_id", workoutExerciseIds)
          .order("weight", { ascending: false })
          .limit(1);

        if (error) {
          console.error("Error fetching heaviest weight:", error);
          return;
        }

        if (data && data.length > 0 && data[0].weight > 0) {
          setValue(data[0].weight);
          onChange?.(data[0].weight);
        }

        setHasFetched(true);
      } catch (error) {
        console.error("Error fetching heaviest weight:", error);
      }
    };

    fetchHeaviestWeight();
  }, [exerciseId, isCompleted, initialValue, hasFetched]); // Removed onChange from dependencies

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (isCompleted) return;

    const newValue = Math.min(Math.max(Number(e.target.value), min), max);
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
    <div
      className={`weight-input ${className} ${isCompleted ? "disabled" : ""}`}
    >
      <input
        type="number"
        value={displayValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        min={min}
        max={max}
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
          width: 75px;
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
