"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AppLayout from "@/components/layout/AppLayout";
import Header from "@/components/navigation/Header";
import ExerciseCard from "@/components/exercises/ExerciseCard";
import SetRow from "@/components/exercises/SetRow";
import WeightInput from "@/components/exercises/WeightInput";
import TipsList from "@/components/exercises/TipsList";
import Button from "@/components/ui/Button";

// Mock data - would come from API/database in real implementation
const workoutData = {
  id: "1",
  name: "Lower Body Strength",
  type: "Workout A",
  benefit: "Build leg strength for steep ascents",
  exercises: [
    {
      id: "ex1",
      name: "Squats",
      sets: 3,
      reps: 12,
      restTime: 60,
      tips: [
        "Keep your back straight",
        "Knees should not extend beyond toes",
        "Breathe out as you push up",
      ],
      videoUrl: "https://youtube.com/embed/QKKZ9AGYTi4",
    },
    {
      id: "ex2",
      name: "Lunges",
      sets: 3,
      reps: 10,
      restTime: 45,
      tips: [
        "Step forward far enough to create 90° angles with both legs",
        "Keep your upper body straight",
        "Lower your hips, not your torso",
      ],
      videoUrl: "https://youtube.com/embed/QOVaHwm-Q6U",
    },
  ],
};

export default function WorkoutPage() {
  const router = useRouter();
  const [weights, setWeights] = useState<Record<string, number>>({});

  const handleWeightChange = (exerciseId: string, value: number) => {
    setWeights((prev) => ({
      ...prev,
      [exerciseId]: value,
    }));
  };

  const handleBack = () => {
    router.push("/workouts");
  };

  const handleComplete = () => {
    // In a real app, you would save the workout completion with weights
    console.log("Workout completed with weights:", weights);
    router.push("/dashboard");
  };

  return (
    <AppLayout>
      <div className="pb-6">
        <Header
          title={workoutData.name}
          showBackButton
          onBackClick={handleBack}
          isFlushWithTop={true}
        />

        <div className="p-4 pt-6">
          <h2 className="text-lg font-medium text-green-200 mb-1">Benefit</h2>
          <p className="text-white">{workoutData.benefit}</p>
        </div>

        <div className="space-y-6 px-4">
          {workoutData.exercises.map((exercise) => (
            <ExerciseCard key={exercise.id} name={exercise.name}>
              <div className="mt-4 space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-200 mb-2">
                    Sets
                  </h3>
                  <div className="space-y-2">
                    {Array.from({ length: exercise.sets }).map((_, index) => (
                      <SetRow
                        key={index}
                        setNumber={index + 1}
                        details={[
                          { label: "Reps", value: exercise.reps },
                          {
                            label: "Rest",
                            value:
                              index < exercise.sets - 1
                                ? `${exercise.restTime}s`
                                : "0s",
                          },
                        ]}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-200 mb-2">
                    Weight Used (kg)
                  </h3>
                  <WeightInput
                    initialValue={weights[exercise.id] || 0}
                    onChange={(value) => handleWeightChange(exercise.id, value)}
                  />
                </div>

                {exercise.tips.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-200 mb-2">
                      Tips
                    </h3>
                    <TipsList tips={exercise.tips} />
                  </div>
                )}
              </div>
            </ExerciseCard>
          ))}
        </div>

        <div className="mt-8 px-4">
          <Button onClick={handleComplete} fullWidth variant="primary">
            Complete Workout
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
