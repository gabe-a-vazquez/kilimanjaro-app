"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageCard } from "@/components/layout/PageCard";
import { Header } from "@/components/navigation/Header";
import { CollapsibleCard } from "@/components/training/CollapsibleCard";
import { WorkoutRow } from "@/components/training/WorkoutRow";
import { createClient, handleSupabaseError } from "@/lib/supabase";

type WeekWithWorkouts = {
  id: number;
  title: string;
  startDate: Date;
  endDate: Date;
  description: string;
  progress: string;
  workouts: {
    id: number;
    day: string;
    type: string;
    summary: string;
    status: "upcoming" | "today" | "completed";
  }[];
};

export default function WorkoutsPage() {
  const router = useRouter();
  const [weeklyData, setWeeklyData] = useState<WeekWithWorkouts[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const isCurrentWeek = (week: WeekWithWorkouts): boolean => {
    const now = new Date();
    return now >= week.startDate && now <= week.endDate;
  };

  const calculateTotalProgress = (data: WeekWithWorkouts[]): string => {
    const allWorkouts = data.flatMap((week) => week.workouts);
    const completedWorkouts = allWorkouts.filter(
      (workout) => workout.status === "completed"
    );
    const progressPercentage = Math.round(
      (completedWorkouts.length / allWorkouts.length) * 100
    );
    return `${progressPercentage}%`;
  };

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      console.log("Fetching data from Supabase...");

      // First, fetch all weeks
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

      // Then, fetch all workouts
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

      console.log("Received weeks:", weeks);
      console.log("Received workouts:", workouts);

      // Combine the data
      const formattedData: WeekWithWorkouts[] = weeks.map((week) => {
        const weekWorkouts = workouts.filter(
          (workout) => workout.week_id === week.id
        );
        const completedCount = weekWorkouts.filter(
          (w) => w.status === "completed"
        ).length;
        const totalCount = weekWorkouts.length;

        return {
          id: week.id,
          title: week.title,
          startDate: new Date(week.start_date),
          endDate: new Date(week.end_date),
          description: week.description,
          progress: `${completedCount}/${totalCount} completed`,
          workouts: weekWorkouts.map((workout) => ({
            id: workout.id,
            day: `Day ${workout.day_number}`,
            type: workout.type,
            summary: workout.summary,
            status: workout.status as "upcoming" | "today" | "completed",
          })),
        };
      });

      setWeeklyData(formattedData);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(handleSupabaseError(err));
    } finally {
      setIsLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Add visibility change listener
  useEffect(() => {
    function handleVisibilityChange() {
      if (document.visibilityState === "visible") {
        console.log("Page became visible, refreshing data...");
        fetchData();
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [fetchData]);

  const handleBackClick = () => {
    router.push("/");
  };

  const navigateToWorkout = (workoutId: number) => {
    router.push(`/workouts/${workoutId}`);
  };

  if (isLoading) {
    return (
      <AppLayout>
        <PageCard>
          <Header
            title="Training Schedule"
            onBackClick={handleBackClick}
            isFlushWithTop={true}
          />
          <div className="flex justify-center items-center h-64">
            <div className="text-gray-400">Loading training schedule...</div>
          </div>
        </PageCard>
      </AppLayout>
    );
  }

  if (error) {
    return (
      <AppLayout>
        <PageCard>
          <Header
            title="Training Schedule"
            onBackClick={handleBackClick}
            isFlushWithTop={true}
          />
          <div className="flex justify-center items-center h-64">
            <div className="text-red-500">Error: {error}</div>
          </div>
        </PageCard>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <PageCard>
        <Header
          title="Training Schedule"
          onBackClick={handleBackClick}
          rightElement={
            <div className="completion-badge">
              {calculateTotalProgress(weeklyData)}
            </div>
          }
          isFlushWithTop={true}
        />

        <div className="week-cards">
          {weeklyData.map((week) => (
            <CollapsibleCard
              key={week.id}
              title={week.title}
              subtitle={`${week.startDate.toDateString()} - ${week.endDate.toDateString()}`}
              indicator={week.progress}
              defaultOpen={isCurrentWeek(week)}
            >
              {week.workouts.map((workout) => (
                <WorkoutRow
                  key={workout.id}
                  day={workout.day}
                  type={workout.type}
                  summary={workout.summary}
                  status={workout.status}
                  onClick={() => navigateToWorkout(workout.id)}
                />
              ))}
            </CollapsibleCard>
          ))}
        </div>

        <style jsx>{`
          .week-cards {
            padding: 1.25rem;
          }
        `}</style>
      </PageCard>
    </AppLayout>
  );
}
