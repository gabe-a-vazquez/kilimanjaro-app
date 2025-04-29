"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { createClient } from "@/lib/supabase";
import AppLayout from "@/components/layout/AppLayout";
import Header from "@/components/navigation/Header";
import ExerciseCard from "@/components/exercises/ExerciseCard";
import SetRow from "@/components/exercises/SetRow";
import WeightInput from "@/components/exercises/WeightInput";
import TipsList from "@/components/exercises/TipsList";
import Button from "@/components/ui/Button";
import confetti from "canvas-confetti";
import { Database } from "@/lib/database.types";

type WorkoutExercise = {
  id: number;
  workout_exercise_id: number;
  name: string;
  sets: number;
  reps: number;
  restTime: number;
  tips: string[];
  videoUrl: string | null;
  exercise_sets?: {
    set_number: number;
    weight: number;
    is_completed: boolean;
  }[];
};

type WorkoutData = {
  id: number;
  name: string;
  title: string;
  type: string;
  date: Date;
  benefit: string | null;
  warmup: string | null;
  exercises: WorkoutExercise[];
  status: string;
};

export default function WorkoutPage() {
  const params = useParams();
  const router = useRouter();
  const [weights, setWeights] = useState<
    Record<string, Record<number, number>>
  >({});
  const [workoutData, setWorkoutData] = useState<WorkoutData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();
  const workoutId = params?.id as string;

  useEffect(() => {
    async function fetchWorkoutData() {
      if (!workoutId) return;

      try {
        setIsLoading(true);
        setError(null);

        // Fetch workout details
        const { data: workout, error: workoutError } = await supabase
          .from("workouts")
          .select("*")
          .eq("id", parseInt(workoutId))
          .single();

        if (workoutError) {
          throw new Error(`Failed to fetch workout: ${workoutError.message}`);
        }

        if (!workout) {
          throw new Error("Workout not found");
        }

        // Fetch workout exercises with exercise details and sets
        const { data: exercises, error: exercisesError } = await supabase
          .from("workout_exercises")
          .select(
            `
            *,
            exercises:exercise_id (
              id,
              name,
              video_url
            ),
            exercise_sets (
              set_number,
              weight,
              is_completed
            )
          `
          )
          .eq("workout_id", workout.id)
          .order("sequence_number");

        if (exercisesError) {
          throw new Error(
            `Failed to fetch exercises: ${exercisesError.message}`
          );
        }

        // Transform the data into the expected format
        const formattedExercises: WorkoutExercise[] =
          exercises?.map((ex) => ({
            id: ex.exercise_id,
            workout_exercise_id: ex.id,
            name: ex.exercises?.name || `Exercise ${ex.exercise_id}`,
            sets: ex.sets,
            reps: ex.reps,
            restTime: ex.rest_time,
            videoUrl: ex.exercises?.video_url,
            tips: [], // We'll need to add tips to the database if needed
            exercise_sets: ex.exercise_sets,
          })) || [];

        // Initialize weights state from exercise sets - now per set
        const initialWeights: Record<string, Record<number, number>> = {};
        formattedExercises.forEach((exercise) => {
          initialWeights[exercise.id] = {};
          if (exercise.exercise_sets) {
            exercise.exercise_sets.forEach((set) => {
              initialWeights[exercise.id][set.set_number] = set.weight;
            });
          }
        });
        setWeights(initialWeights);

        setWorkoutData({
          id: workout.id,
          name: workout.name,
          title: workout.title,
          type: workout.type,
          date: new Date(workout.date),
          benefit: workout.benefit,
          warmup: workout.warmup,
          exercises: formattedExercises,
          status: workout.status,
        });
      } catch (err) {
        console.error("Error fetching workout data:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchWorkoutData();
  }, [supabase, workoutId]);

  const handleWeightChange = (
    exerciseId: string,
    setNumber: number,
    value: number
  ) => {
    setWeights((prev) => ({
      ...prev,
      [exerciseId]: {
        ...(prev[exerciseId] || {}),
        [setNumber]: value,
      },
    }));
  };

  const handleBack = () => {
    router.push("/workouts");
  };

  const handleComplete = async () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    try {
      if (!workoutData?.id) {
        throw new Error("Workout ID is missing");
      }
      // Check if all exercises are completed
      type WorkoutExercise =
        Database["public"]["Tables"]["workout_exercises"]["Row"];
      const { data: exercises, error: exercisesError } = await supabase
        .from("workout_exercises")
        .select<"*", WorkoutExercise>("*")
        .eq("workout_id", workoutData.id);
      if (exercisesError) {
        console.error("Error checking exercises status:", exercisesError);
        throw new Error(
          `Failed to check exercises status: ${exercisesError.message}`
        );
      }
      const allExercisesCompleted = exercises?.every(
        (ex) => ex.status === "completed"
      );
      if (!allExercisesCompleted) {
        setError(
          "Please complete all exercises before marking the workout as complete"
        );
        return;
      }
      // Direct SQL update for the workout status
      const { error: updateError } = await supabase.rpc("complete_workout", {
        workout_id: workoutData.id,
      });
      if (updateError) {
        console.error("Error updating workout status:", updateError);
        throw new Error(
          `Failed to update workout status: ${updateError.message}`
        );
      }
      router.push("/workouts");
    } catch (err) {
      console.error("Error completing workout:", err);
      setError(
        err instanceof Error ? err.message : "Failed to complete workout"
      );
    }
  };

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-gray-400">Loading workout...</div>
        </div>
      </AppLayout>
    );
  }

  if (error || !workoutData) {
    return (
      <AppLayout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-red-500">
            {error || "Failed to load workout"}
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="pb-6">
        <Header
          title={workoutData.title}
          showBackButton
          onBackClick={handleBack}
          isFlushWithTop={true}
        />

        {/* <div className="px-4 pt-6">
          <div className="benefit-card">
            <div className="benefit-icon">🏔️</div>
            <div className="benefit-text">{workoutData.benefit}</div>
          </div>
        </div> */}

        <div className="space-y-6 px-4">
          {workoutData.exercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              name={exercise.name}
              exerciseId={exercise.id}
              workoutId={workoutData.id}
              weight={weights[exercise.id] || {}}
            >
              <div className="mt-4 space-y-4">
                <div>
                  <div className="space-y-2">
                    {Array.from({ length: exercise.sets }).map((_, index) => {
                      const setNumber = index + 1;
                      const savedSet = exercise.exercise_sets?.find(
                        (set) => set.set_number === setNumber
                      );
                      return (
                        <SetRow
                          key={index}
                          number={setNumber}
                          details={[
                            { label: "REPS", value: exercise.reps },
                            {
                              label: "REST",
                              value:
                                index < exercise.sets - 1
                                  ? `${exercise.restTime}s`
                                  : "0s",
                            },
                          ]}
                          rightElement={
                            <WeightInput
                              initialValue={
                                savedSet?.weight ??
                                weights[exercise.id]?.[setNumber] ??
                                0
                              }
                              onChange={(value) =>
                                handleWeightChange(
                                  exercise.id.toString(),
                                  setNumber,
                                  value
                                )
                              }
                              unit="lbs"
                              exerciseId={exercise.id}
                            />
                          }
                        />
                      );
                    })}
                  </div>
                </div>

                {exercise.tips && exercise.tips.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-200 mb-2">
                      Tips
                    </h3>
                    <TipsList tips={exercise.tips} />
                  </div>
                )}

                {exercise.videoUrl && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-200 mb-2">
                      Video Guide
                    </h3>
                    <div className="aspect-video rounded-lg overflow-hidden">
                      <iframe
                        src={exercise.videoUrl}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                )}
              </div>
            </ExerciseCard>
          ))}
        </div>

        <div className="complete-workout-button">
          <Button
            onClick={handleComplete}
            fullWidth
            variant={
              workoutData.status === "completed" ? "secondary" : "primary"
            }
            disabled={workoutData.status === "completed"}
          >
            {workoutData.status === "completed"
              ? "Workout Complete!"
              : "Complete Workout"}
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
