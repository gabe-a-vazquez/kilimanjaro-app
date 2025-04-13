"use client";

import { AppLayout } from "@/components/layout/AppLayout";
import { PageCard } from "@/components/layout/PageCard";
import { Header } from "@/components/navigation/Header";
import { CollapsibleCard } from "@/components/training/CollapsibleCard";
import { WorkoutRow } from "@/components/training/WorkoutRow";
import { useRouter } from "next/navigation";

// Sample data for the page
const weeklyData = [
  {
    id: 1,
    title: "Week 1",
    dates: "April 1-7, 2025",
    progress: "2/3 completed",
    isOpen: true,
    workouts: [
      {
        id: 101,
        day: "Day 1",
        type: "Workout A",
        summary: "Leg Strength Focus",
        status: "completed" as const,
      },
      {
        id: 102,
        day: "Day 2",
        type: "Workout B",
        summary: "Core & Balance",
        status: "completed" as const,
      },
      {
        id: 103,
        day: "Day 3",
        type: "Workout C",
        summary: "Cardio Endurance",
        status: "today" as const,
      },
    ],
  },
  {
    id: 2,
    title: "Week 2",
    dates: "April 8-14, 2025",
    progress: "0/3 completed",
    workouts: [
      {
        id: 201,
        day: "Day 1",
        type: "Workout A",
        summary: "Leg Strength Focus",
        status: "upcoming" as const,
      },
      {
        id: 202,
        day: "Day 2",
        type: "Workout B",
        summary: "Core & Balance",
        status: "upcoming" as const,
      },
      {
        id: 203,
        day: "Day 3",
        type: "Workout C",
        summary: "Cardio Endurance",
        status: "upcoming" as const,
      },
    ],
  },
  {
    id: 3,
    title: "Week 3",
    dates: "April 15-21, 2025",
    progress: "0/3 completed",
    workouts: [
      {
        id: 301,
        day: "Day 1",
        type: "Workout A",
        summary: "Leg Strength Focus",
        status: "upcoming" as const,
      },
      {
        id: 302,
        day: "Day 2",
        type: "Workout B",
        summary: "Core & Balance",
        status: "upcoming" as const,
      },
      {
        id: 303,
        day: "Day 3",
        type: "Workout C",
        summary: "Interval Training",
        status: "upcoming" as const,
      },
    ],
  },
  {
    id: 4,
    title: "Week 4",
    dates: "April 22-28, 2025",
    progress: "0/3 completed",
    workouts: [
      {
        id: 401,
        day: "Day 1",
        type: "Workout A",
        summary: "Advanced Strength",
        status: "upcoming" as const,
      },
      {
        id: 402,
        day: "Day 2",
        type: "Workout B",
        summary: "Core & Stability",
        status: "upcoming" as const,
      },
      {
        id: 403,
        day: "Day 3",
        type: "Workout C",
        summary: "Endurance Challenge",
        status: "upcoming" as const,
      },
    ],
  },
];

export default function WorkoutsPage() {
  const router = useRouter();

  const handleBackClick = () => {
    router.push("/");
  };

  const navigateToWorkout = (workoutId: number) => {
    router.push(`/workouts/${workoutId}`);
  };

  return (
    <AppLayout>
      <PageCard>
        <Header
          title="Training Schedule"
          onBackClick={handleBackClick}
          rightElement={<div className="completion-percent">35%</div>}
          isFlushWithTop={true}
        />

        <div className="week-cards">
          {weeklyData.map((week) => (
            <CollapsibleCard
              key={week.id}
              title={week.title}
              subtitle={week.dates}
              indicator={week.progress}
              defaultOpen={week.isOpen}
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

          .completion-percent {
            background: linear-gradient(145deg, #ff9967, #ff7440);
            color: white;
            padding: 0.25rem 0.75rem;
            border-radius: 12px;
            font-size: 0.75rem;
            font-weight: 500;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
          }
        `}</style>
      </PageCard>
    </AppLayout>
  );
}
