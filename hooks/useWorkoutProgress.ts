import { useState, useEffect } from "react";
import {
  UserProgress,
  Workout,
  TrainingWeek,
  Camp,
  TrainingProgram,
} from "../types/workout-types";
import {
  calculateProgressPercentage,
  getNextCamp,
  calculateWeekCompletion,
  findNextWorkout,
  formatElevation,
} from "../utils/workout-helpers";

interface WorkoutProgressState extends UserProgress {
  progressPercentage: number;
  nextCamp?: Camp;
  nextWorkout?: Workout;
  formattedElevation: string;
  daysUntilNextWorkout?: number;
}

/**
 * Hook for managing and tracking user workout progress
 * @param initialProgress The initial user progress data
 * @param trainingProgram The complete training program
 * @returns State and methods for working with workout progress
 */
export const useWorkoutProgress = (
  initialProgress: UserProgress,
  trainingProgram: TrainingProgram
): {
  progress: WorkoutProgressState;
  completeWorkout: (workoutId: string) => void;
  updateElevation: (newElevation: number) => void;
  getCurrentWeek: () => TrainingWeek | undefined;
} => {
  const [progress, setProgress] = useState<WorkoutProgressState>(() => {
    const nextCamp = getNextCamp(
      trainingProgram.camps,
      initialProgress.currentElevation
    );
    const progressPercentage = calculateProgressPercentage(
      trainingProgram.camps,
      initialProgress.currentElevation
    );

    return {
      ...initialProgress,
      progressPercentage,
      nextCamp,
      formattedElevation: formatElevation(initialProgress.currentElevation),
    };
  });

  // Get current week based on date
  const getCurrentWeek = (): TrainingWeek | undefined => {
    if (!trainingProgram.weeks || trainingProgram.weeks.length === 0)
      return undefined;

    const today = new Date();

    // Find the current week based on date range
    return trainingProgram.weeks.find((week) => {
      const startDate = new Date(week.startDate);
      const endDate = new Date(week.endDate);
      return today >= startDate && today <= endDate;
    });
  };

  // Get the next workout
  useEffect(() => {
    const currentWeek = getCurrentWeek();
    if (!currentWeek) return;

    // Find the next workout from the current week
    const nextWorkout = findNextWorkout(currentWeek.workouts);

    // Calculate days until the next workout
    let daysUntilNextWorkout: number | undefined = undefined;
    if (nextWorkout) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const workoutDate = new Date(nextWorkout.date);
      workoutDate.setHours(0, 0, 0, 0);

      const diffTime = workoutDate.getTime() - today.getTime();
      daysUntilNextWorkout = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    setProgress((prev) => ({
      ...prev,
      nextWorkout,
      daysUntilNextWorkout,
      currentWeekId: currentWeek.id,
    }));
  }, [trainingProgram.weeks, progress.workoutsCompleted]);

  // Mark a workout as completed
  const completeWorkout = (workoutId: string) => {
    const currentWeek = getCurrentWeek();
    if (!currentWeek) return;

    // Find the workout in the current week
    const workout = currentWeek.workouts.find((w) => w.id === workoutId);
    if (!workout || workout.status === "completed") return;

    // Increment elevation based on this workout's contribution
    const elevationGain = workout.elevationGain || 0;
    const newElevation = progress.currentElevation + elevationGain;

    // Calculate new progress values
    const nextCamp = getNextCamp(trainingProgram.camps, newElevation);
    const progressPercentage = calculateProgressPercentage(
      trainingProgram.camps,
      newElevation
    );

    // Check if we've completed all workouts in the week
    const weekCompletion = calculateWeekCompletion({
      ...currentWeek,
      workouts: currentWeek.workouts.map((w) =>
        w.id === workoutId ? { ...w, status: "completed" } : w
      ),
    });

    // If week is 100% complete, increment weeksCompleted
    const weeksCompleted =
      weekCompletion === 100
        ? progress.weeksCompleted + 1
        : progress.weeksCompleted;

    setProgress({
      currentElevation: newElevation,
      weeksCompleted,
      workoutsCompleted: progress.workoutsCompleted + 1,
      nextCampId: nextCamp?.id,
      currentWeekId: currentWeek.id,
      progressPercentage,
      nextCamp,
      formattedElevation: formatElevation(newElevation),
    });
  };

  // Update user elevation directly
  const updateElevation = (newElevation: number) => {
    const nextCamp = getNextCamp(trainingProgram.camps, newElevation);
    const progressPercentage = calculateProgressPercentage(
      trainingProgram.camps,
      newElevation
    );

    setProgress((prev) => ({
      ...prev,
      currentElevation: newElevation,
      nextCampId: nextCamp?.id,
      progressPercentage,
      nextCamp,
      formattedElevation: formatElevation(newElevation),
    }));
  };

  return {
    progress,
    completeWorkout,
    updateElevation,
    getCurrentWeek,
  };
};
