"use client";

import React, { ReactNode, useState } from "react";
import { createClient } from "@/lib/supabase";

interface ExerciseCardProps {
  name: string;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
  exerciseId: number;
  workoutId: number;
  reps: number;
  weight: number;
}

export function ExerciseCard({
  name,
  children,
  className = "",
  exerciseId,
  workoutId,
  reps,
  weight,
}: ExerciseCardProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const supabase = createClient();

  const handleSave = async () => {
    try {
      setIsSaving(true);

      const { error: trackingError } = await supabase
        .from("weight_tracking")
        .insert({
          workout_id: workoutId,
          exercise_id: exerciseId,
          weight_lbs: weight,
          reps_completed: reps,
          set_number: 1,
          date_recorded: new Date().toISOString().split("T")[0],
        });

      if (trackingError) {
        console.error("Error saving exercise:", trackingError);
        throw new Error(`Failed to save exercise: ${trackingError.message}`);
      }

      setIsCompleted(true);
    } catch (err) {
      console.error("Error saving exercise:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const icon = (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`check-icon ${isCompleted ? "completed" : ""} ${
        isSaving ? "saving" : ""
      }`}
      onClick={!isSaving && !isCompleted ? handleSave : undefined}
      style={{ cursor: !isSaving && !isCompleted ? "pointer" : "default" }}
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M8 12L11 15L16 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <div className={`exercise-card ${className}`}>
      <div className="exercise-header">
        <div className="exercise-name">{name}</div>
        <div className="exercise-icon">{icon}</div>
      </div>
      <div className="exercise-content">{children}</div>

      <style jsx>{`
        .exercise-card {
          background: #0a2518;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: 0 15px 25px rgba(0, 0, 0, 0.2);
          color: white;
          width: 100%;
        }

        .exercise-header {
          padding: 1rem 1.25rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: linear-gradient(
            145deg,
            rgba(32, 85, 64, 0.6),
            rgba(26, 69, 52, 0.6)
          );
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .exercise-name {
          font-weight: 600;
          font-size: 1.25rem;
          letter-spacing: -0.01em;
        }

        .exercise-icon {
          font-size: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.9);
        }

        .exercise-content {
          padding: 1.25rem;
        }
      `}</style>

      <style jsx global>{`
        .check-icon {
          transition: all 0.2s ease;
          transform: scale(1.1);
        }

        .check-icon:not(.completed):not(.saving):hover {
          transform: scale(1.2);
          color: rgba(255, 255, 255, 1);
        }

        .check-icon.completed {
          color: #4ade80;
        }

        .check-icon.saving {
          opacity: 0.5;
        }
      `}</style>
    </div>
  );
}

export default ExerciseCard;
