"use client";

import { CountdownTimer } from "@/components/training/CountdownTimer";
import { ProgressBar } from "@/components/training/ProgressBar";
import { InfoCard } from "@/components/ui/InfoCard";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import PageCard from "@/components/layout/PageCard";
import AppLayout from "@/components/layout/AppLayout";

export default function Home() {
  // Sample data for the page
  const targetDate = new Date("June 26, 2025");

  const camps = [
    { name: "Summit (Uhuru Peak)", elevation: "5,895 m" },
    { name: "Barafu Camp", elevation: "4,673 m" },
    { name: "Karanga Camp", elevation: "3,995 m" },
    { name: "Barranco Camp", elevation: "3,900 m" },
    { name: "Shira Camp", elevation: "3,750 m" },
  ];

  return (
    <AppLayout>
      <PageCard>
        {/* Countdown Timer - Outside the container to go full-width at top */}
        <CountdownTimer targetDate={targetDate} />

        {/* Trail Visualization */}
        <ProgressBar
          camps={camps}
          currentElevation="Current Elevation: ~1,800 m (Rainforest Zone)"
          approachingCamp="Machame Camp"
          progressPercentage={20}
        />

        {/* Fun Fact */}
        <InfoCard
          title="Tanzania Fun Fact"
          imageSrc="/images/tanzania-wildlife.webp"
          className="mt-6 w-full"
        >
          Tanzania is home to over 4 million wild animals and 1,000 bird
          species.
        </InfoCard>

        {/* Navigation Button */}
        <Link href="/workouts" className="workout-button-link mb-4">
          <Button isAnimated>Start Workout</Button>
        </Link>
      </PageCard>
    </AppLayout>
  );
}
