"use client";

import React, {
  ReactNode,
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from "react";
import { createClient } from "@/lib/supabase";
import { Database } from "@/lib/database.types";

interface ExerciseCardProps {
  name: string;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
  exerciseId: number;
  workoutId: number;
  weight: Record<number, number>;
}

interface ExerciseContextType {
  isCompleted: boolean;
}

const ExerciseContext = createContext<ExerciseContextType>({
  isCompleted: false,
});

export const useExerciseContext = () => {
  const context = useContext(ExerciseContext);
  if (!context) {
    throw new Error("useExerciseContext must be used within an ExerciseCard");
  }
  return context;
};

export function ExerciseCard({
  name,
  children,
  className = "",
  exerciseId,
  workoutId,
  weight,
}: ExerciseCardProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const supabase = createClient();

  const checkCompletionStatus = useCallback(async () => {
    try {
      type WorkoutExercise =
        Database["public"]["Tables"]["workout_exercises"]["Row"];
      const { data, error } = await supabase
        .from("workout_exercises")
        .select<"*", WorkoutExercise>("*")
        .eq("workout_id", workoutId)
        .eq("exercise_id", exerciseId)
        .single();

      if (error) {
        console.error("Error checking exercise status:", error);
        return;
      }

      setIsCompleted(data?.status === "completed");
    } catch (err) {
      console.error("Unexpected error checking completion status:", err);
    }
  }, [supabase, workoutId, exerciseId]);

  useEffect(() => {
    checkCompletionStatus();
  }, [checkCompletionStatus]);

  const handleSave = async () => {
    try {
      setIsSaving(true);

      // First get the workout_exercise record to get its ID and number of sets
      const { data: workoutExercise, error: fetchError } = await supabase
        .from("workout_exercises")
        .select("*")
        .eq("workout_id", workoutId)
        .eq("exercise_id", exerciseId)
        .single();

      if (fetchError) {
        console.error("Error fetching workout exercise:", fetchError);
        throw new Error(
          `Failed to fetch workout exercise: ${fetchError.message}`
        );
      }

      // Create exercise sets if they don't exist
      const exerciseSets = Array.from({ length: workoutExercise.sets }).map(
        (_, index) => ({
          workout_exercise_id: workoutExercise.id,
          set_number: index + 1,
          weight: weight[index + 1] || 0,
          is_completed: true,
        })
      );

      const { error: setsError } = await supabase
        .from("exercise_sets")
        .upsert(exerciseSets, {
          onConflict: "workout_exercise_id,set_number",
        });

      if (setsError) {
        console.error("Error creating exercise sets:", setsError);
        throw new Error(`Failed to create exercise sets: ${setsError.message}`);
      }

      // Mark the exercise as completed
      type WorkoutExerciseUpdate =
        Database["public"]["Tables"]["workout_exercises"]["Update"];
      const { error: updateError } = await supabase
        .from("workout_exercises")
        .update<WorkoutExerciseUpdate>({
          status: "completed",
        })
        .eq("workout_id", workoutId)
        .eq("exercise_id", exerciseId);

      if (updateError) {
        console.error("Error updating exercise:", updateError);
        throw new Error(`Failed to update exercise: ${updateError.message}`);
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
    <ExerciseContext.Provider value={{ isCompleted }}>
      <div className={`exercise-card ${className}`}>
        <div className="exercise-header">
          <div className="exercise-name-container">
            <div className="exercise-name">{name}</div>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="chart-icon"
              onClick={() => setIsModalOpen(true)}
            >
              <path
                d="M3 3v18h18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7 14l4-4 4 4 5-5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="exercise-icon">{icon}</div>
        </div>
        <div className="exercise-content">{children}</div>

        {isModalOpen && (
          <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>{name} Progress</h2>
                <button
                  className="close-button"
                  onClick={() => setIsModalOpen(false)}
                >
                  ×
                </button>
              </div>
              <div className="modal-body">
                <p>Progress chart will be implemented here</p>
              </div>
            </div>
          </div>
        )}

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

          .exercise-name-container {
            display: flex;
            align-items: center;
            gap: 0.5rem;
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

          .chart-icon {
            color: rgba(255, 255, 255, 0.6);
            transition: all 0.2s ease;
            cursor: pointer;
          }

          .chart-icon:hover {
            color: rgba(255, 255, 255, 0.9);
            transform: scale(1.1);
          }

          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
          }

          .modal-content {
            background: #0a2518;
            border-radius: 16px;
            padding: 1.5rem;
            width: 90%;
            max-width: 600px;
            max-height: 80vh;
            overflow-y: auto;
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
          }

          .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          }

          .modal-header h2 {
            margin: 0;
            font-size: 1.5rem;
            color: white;
          }

          .close-button {
            background: none;
            border: none;
            color: rgba(255, 255, 255, 0.6);
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0.5rem;
            line-height: 1;
            border-radius: 8px;
            transition: all 0.2s ease;
          }

          .close-button:hover {
            color: white;
            background: rgba(255, 255, 255, 0.1);
          }

          .modal-body {
            color: rgba(255, 255, 255, 0.9);
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
    </ExerciseContext.Provider>
  );
}

export default ExerciseCard;
