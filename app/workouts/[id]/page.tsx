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

type WorkoutExercise = {
  id: number;
  name: string;
  sets: number;
  reps: number;
  restTime: number;
  tips: string[];
  videoUrl: string | null;
};

type WorkoutData = {
  id: number;
  name: string;
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
  const [weights, setWeights] = useState<Record<string, number>>({});
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
        console.log("Fetching workout:", workoutId);

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

        console.log("Found workout:", workout);

        // Fetch workout exercises with exercise details
        const { data: exercises, error: exercisesError } = await supabase
          .from("workout_exercises")
          .select(
            `
            *,
            exercises:exercise_id (
              id,
              name,
              video_url
            )
          `
          )
          .eq("workout_id", workout.id)
          .order("sequence_number");

        console.log("Exercises query result:", exercises);

        if (exercisesError) {
          throw new Error(
            `Failed to fetch exercises: ${exercisesError.message}`
          );
        }

        // Transform the data into the expected format
        const formattedExercises: WorkoutExercise[] =
          exercises?.map((ex) => ({
            id: ex.exercise_id,
            name: ex.exercises?.name || `Exercise ${ex.exercise_id}`,
            sets: ex.sets,
            reps: ex.reps,
            restTime: ex.rest_time,
            videoUrl: ex.exercises?.video_url,
            tips: [], // We'll need to add tips to the database if needed
          })) || [];

        setWorkoutData({
          id: workout.id,
          name: workout.name,
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

  const handleWeightChange = (exerciseId: string, value: number) => {
    setWeights((prev) => ({
      ...prev,
      [exerciseId]: value,
    }));
  };

  const handleBack = () => {
    router.push("/workouts");
  };

  const handleComplete = async () => {
    try {
      if (!workoutData?.id) {
        throw new Error("Workout ID is missing");
      }

      // Save the workout completion with weights
      const { error: trackingError } = await supabase
        .from("weight_tracking")
        .insert(
          Object.entries(weights).map(([exerciseId, weight]) => ({
            workout_id: workoutData.id,
            exercise_id: parseInt(exerciseId),
            weight_lbs: weight,
            reps_completed:
              workoutData.exercises.find((e) => e.id === parseInt(exerciseId))
                ?.reps || 0,
            set_number: 1,
            date_recorded: new Date().toISOString().split("T")[0],
          }))
        );

      if (trackingError) {
        console.error("Error saving weights:", trackingError);
        throw new Error(`Failed to save weights: ${trackingError.message}`);
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
          title={workoutData.name}
          showBackButton
          onBackClick={handleBack}
          isFlushWithTop={true}
        />

        <div className="px-4 pt-6">
          <div className="benefit-card">
            <div className="benefit-icon">🏔️</div>
            <div className="benefit-text">{workoutData.benefit}</div>
          </div>
        </div>

        <div className="space-y-6 px-4">
          {workoutData.exercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              name={exercise.name}
              exerciseId={exercise.id}
              workoutId={workoutData.id}
              reps={exercise.reps}
              weight={weights[exercise.id] || 0}
            >
              <div className="mt-4 space-y-4">
                <div>
                  <div className="space-y-2">
                    {Array.from({ length: exercise.sets }).map((_, index) => (
                      <SetRow
                        key={index}
                        number={index + 1}
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
                            initialValue={weights[exercise.id] || 0}
                            onChange={(value) =>
                              handleWeightChange(exercise.id.toString(), value)
                            }
                            unit="lbs"
                          />
                        }
                      />
                    ))}
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
