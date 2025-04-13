/**
 * Type definitions for the Kilimanjaro Training App
 */

/**
 * Status of a workout
 */
export type WorkoutStatus = "completed" | "upcoming" | "today" | "missed";

/**
 * Workout intensity level
 */
export type WorkoutIntensity = "low" | "medium" | "high";

/**
 * Workout type
 */
export type WorkoutType = "cardio" | "strength" | "hike" | "rest" | "stretch";

/**
 * Workout definition
 */
export interface Workout {
  id: string;
  title: string;
  description: string;
  date: string; // ISO date string
  duration: number; // in minutes
  type: WorkoutType;
  intensity: WorkoutIntensity;
  status: WorkoutStatus;
  elevationGain?: number; // in meters
}

/**
 * Training week structure
 */
export interface TrainingWeek {
  id: string;
  weekNumber: number;
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  theme?: string;
  workouts: Workout[];
  elevationGain: number; // Total elevation gain for the week in meters
}

/**
 * Camp on Kilimanjaro
 */
export interface Camp {
  id: string;
  name: string;
  elevation: number; // in meters
  description: string;
  imageUrl?: string;
}

/**
 * User training progress
 */
export interface UserProgress {
  currentElevation: number; // in meters
  weeksCompleted: number;
  workoutsCompleted: number;
  nextCampId?: string;
  currentWeekId?: string;
}

/**
 * Full training program
 */
export interface TrainingProgram {
  id: string;
  title: string;
  description: string;
  startDate: string; // ISO date string
  summitDate: string; // ISO date string
  weeks: TrainingWeek[];
  camps: Camp[];
}

// Base exercise information
export interface Exercise {
  id: string;
  name: string;
  description?: string;
  muscleGroups?: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
}

// Set information for exercises
export interface ExerciseSet {
  setNumber: number;
  reps?: number;
  weight?: number;
  duration?: number; // in seconds
  distance?: number; // in meters
  restTime?: number; // in seconds
  isCompleted?: boolean;
}

// Workout exercise with workout-specific details
export interface WorkoutExercise {
  id: string;
  exerciseId: string;
  name: string;
  sets: number;
  reps?: number;
  weight?: number;
  restTime: number; // in seconds
  tips: string[];
  videoUrl?: string;
  notes?: string;
}

// User profile
export interface UserProfile {
  name: string;
  fitnessLevel: "beginner" | "intermediate" | "advanced";
  adventureDate: Date;
  preferredMeasurementSystem: "metric" | "imperial";
  height?: number;
  weight?: number;
  progress: UserProgress;
}

// App settings
export interface AppSettings {
  darkMode: boolean;
  notifications: boolean;
  soundEffects: boolean;
  language: string;
}
