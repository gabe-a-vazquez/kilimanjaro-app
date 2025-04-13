/**
 * Workout helper utilities for the Kilimanjaro Training App
 */

import {
  WorkoutStatus,
  Workout,
  TrainingWeek,
  UserProgress,
  Camp,
} from "../types/workout-types";

/**
 * Calculate the percentage of workouts completed for a training week
 * @param week The training week to calculate completion for
 * @returns Percentage complete (0-100)
 */
export const calculateWeekCompletion = (week: TrainingWeek): number => {
  if (!week.workouts || week.workouts.length === 0) return 0;

  const totalWorkouts = week.workouts.length;
  const completedWorkouts = week.workouts.filter(
    (workout) => workout.status === "completed"
  ).length;

  return Math.round((completedWorkouts / totalWorkouts) * 100);
};

/**
 * Find the upcoming workout that's next in the schedule
 * @param workouts List of workouts
 * @returns The next workout or undefined if none found
 */
export const findNextWorkout = (workouts: Workout[]): Workout | undefined => {
  if (!workouts || workouts.length === 0) return undefined;

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time to beginning of day

  // Filter to upcoming workouts
  const upcomingWorkouts = workouts
    .filter((workout) => {
      const workoutDate = new Date(workout.date);
      workoutDate.setHours(0, 0, 0, 0);
      return workoutDate >= today && workout.status !== "completed";
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return upcomingWorkouts.length > 0 ? upcomingWorkouts[0] : undefined;
};

/**
 * Find the workout scheduled for today, if any
 * @param workouts List of workouts
 * @returns Today's workout or undefined if none found
 */
export const findTodayWorkout = (workouts: Workout[]): Workout | undefined => {
  if (!workouts || workouts.length === 0) return undefined;

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time to beginning of day

  return workouts.find((workout) => {
    const workoutDate = new Date(workout.date);
    workoutDate.setHours(0, 0, 0, 0);
    return workoutDate.getTime() === today.getTime();
  });
};

/**
 * Get the next camp based on current elevation
 * @param camps Array of camps in order
 * @param currentElevation Current elevation
 * @returns The next camp or undefined if at final camp
 */
export const getNextCamp = (
  camps: Camp[],
  currentElevation: number
): Camp | undefined => {
  if (!camps || camps.length === 0) return undefined;

  // Sort camps by elevation
  const sortedCamps = [...camps].sort((a, b) => a.elevation - b.elevation);

  // Find the next camp that's higher than current elevation
  const nextCamp = sortedCamps.find(
    (camp) => camp.elevation > currentElevation
  );

  return nextCamp;
};

/**
 * Calculate the percentage of the journey completed based on elevation
 * @param camps List of camps
 * @param currentElevation Current elevation
 * @returns Percentage (0-100) of journey completed
 */
export const calculateProgressPercentage = (
  camps: Camp[],
  currentElevation: number
): number => {
  if (!camps || camps.length === 0) return 0;

  // Sort camps by elevation
  const sortedCamps = [...camps].sort((a, b) => a.elevation - b.elevation);

  // Get start and summit elevations
  const startElevation = sortedCamps[0].elevation;
  const summitElevation = sortedCamps[sortedCamps.length - 1].elevation;

  // Calculate total elevation gain needed
  const totalClimb = summitElevation - startElevation;

  // Calculate elevation gained so far
  const elevationGained = Math.max(0, currentElevation - startElevation);

  // Calculate percentage (capped at 100%)
  const percentage = (elevationGained / totalClimb) * 100;
  return Math.min(100, Math.max(0, Math.round(percentage)));
};

/**
 * Check if a user has reached or passed a specific camp
 * @param camp The camp to check
 * @param currentElevation User's current elevation
 * @returns True if user has reached or passed this camp
 */
export const hasClearedCamp = (
  camp: Camp,
  currentElevation: number
): boolean => {
  return currentElevation >= camp.elevation;
};

/**
 * Format elevation as a string with units
 * @param elevation Elevation in meters
 * @returns Formatted elevation string
 */
export const formatElevation = (elevation: number): string => {
  return `${elevation.toLocaleString()}m`;
};

/**
 * Update the workout status based on current date
 * @param workout The workout to update
 * @returns Updated workout with current status
 */
export const updateWorkoutStatus = (workout: Workout): Workout => {
  if (workout.status === "completed") return workout;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const workoutDate = new Date(workout.date);
  workoutDate.setHours(0, 0, 0, 0);

  const status =
    workoutDate.getTime() === today.getTime() ? "today" : "upcoming";

  return {
    ...workout,
    status,
  };
};
