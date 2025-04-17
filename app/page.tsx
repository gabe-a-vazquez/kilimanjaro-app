"use client";

import { CountdownTimer } from "@/components/training/CountdownTimer";
import { ProgressBar } from "@/components/training/ProgressBar";
import { InfoCard } from "@/components/ui/InfoCard";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import PageCard from "@/components/layout/PageCard";
import AppLayout from "@/components/layout/AppLayout";
import { useEffect, useState } from "react";
import { Camp, getCamps } from "@/services/campService";
import { createClient } from "@/lib/supabase";
import { TrainingWeek, Workout, WorkoutStatus } from "@/types/workout-types";
import { FunFact, getFunFactForDate } from "@/services/funFactService";

export default function Home() {
  // Sample data for the page
  const targetDate = new Date("June 26, 2025");
  const [camps, setCamps] = useState<Camp[]>([]);
  const [weeklyData, setWeeklyData] = useState<TrainingWeek[]>([]);
  const [funFact, setFunFact] = useState<FunFact | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch camps
        const campsData = await getCamps();
        setCamps(campsData);

        // Fetch today's fun fact
        const today = new Date();
        const factData = await getFunFactForDate(today);
        setFunFact(factData);

        // Fetch weeks
        const { data: weeks, error: weeksError } = await supabase
          .from("weeks")
          .select("*")
          .order("id");

        if (weeksError) {
          console.error("Weeks fetch error:", weeksError);
          throw weeksError;
        }

        if (!weeks || weeks.length === 0) {
          console.error("No weeks data returned:", weeks);
          throw new Error("No weeks found in the database");
        }

        // Fetch workouts
        const { data: workouts, error: workoutsError } = await supabase
          .from("workouts")
          .select("*")
          .order("week_id, day_number");

        if (workoutsError) {
          throw workoutsError;
        }

        if (!workouts) {
          throw new Error("No workouts found in the database");
        }

        // Combine the data
        const formattedData: TrainingWeek[] = weeks.map((week) => ({
          id: week.id.toString(),
          weekNumber: week.id,
          startDate: week.start_date,
          endDate: week.end_date,
          theme: week.title,
          elevationGain: 0, // We'll need to calculate this from the workouts
          workouts: workouts
            .filter((workout) => workout.week_id === week.id)
            .map((workout) => ({
              id: workout.id.toString(),
              title: workout.name,
              description: workout.summary,
              date: workout.date,
              duration: 60, // Default duration, we should add this to the database
              type: workout.type as Workout["type"],
              intensity: "medium", // Default intensity, we should add this to the database
              status: workout.status as WorkoutStatus,
              elevationGain: 0, // We'll need to add this to the database
            })),
        }));

        setWeeklyData(formattedData);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setError("Failed to load data");
        setIsLoading(false);
      }
    }

    fetchData();
  }, [supabase]);

  if (isLoading) {
    return (
      <AppLayout>
        <PageCard>
          <div className="flex justify-center items-center min-h-[60vh]">
            <p>Loading data...</p>
          </div>
        </PageCard>
      </AppLayout>
    );
  }

  if (error) {
    return (
      <AppLayout>
        <PageCard>
          <div className="flex justify-center items-center min-h-[60vh]">
            <p className="text-red-500">{error}</p>
          </div>
        </PageCard>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <PageCard>
        {/* Countdown Timer - Outside the container to go full-width at top */}
        <CountdownTimer targetDate={targetDate} />

        {/* Trail Visualization */}
        <ProgressBar camps={camps} weeks={weeklyData} />

        {/* Fun Fact */}
        {funFact && (
          <InfoCard
            title={funFact.title}
            imageSrc={funFact.image_url || "/images/tanzania-wildlife.webp"}
            imageAlt={funFact.image_alt || "Tanzania fun fact image"}
            className="mt-6 w-full"
          >
            {funFact.fact_text}
          </InfoCard>
        )}

        {/* Navigation Button */}
        <Link href="/workouts" className="workout-button-link mb-4">
          <Button isAnimated>Training Plan</Button>
        </Link>
      </PageCard>
    </AppLayout>
  );
}
