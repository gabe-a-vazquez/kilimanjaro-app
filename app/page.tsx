"use client";

import { CountdownTimer } from "@/components/training/CountdownTimer";
import { ProgressBar } from "@/components/training/ProgressBar";
import { InfoCard } from "@/components/ui/InfoCard";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function Home() {
  // Sample data for the page
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 18); // 18 days from now

  const camps = [
    { name: "Summit (Uhuru Peak)", elevation: "5,895 m" },
    { name: "Barafu Camp", elevation: "4,673 m" },
    { name: "Karanga Camp", elevation: "3,995 m" },
    { name: "Barranco Camp", elevation: "3,900 m" },
    { name: "Shira Camp", elevation: "3,750 m" },
  ];

  return (
    <>
      {/* Countdown Timer - Outside the container to go full-width at top */}
      <CountdownTimer targetDate={targetDate} />

      <main className="app-container">
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
        <Link href="/workouts" className="workout-button-link">
          <Button isAnimated>Start Workout</Button>
        </Link>
      </main>
    </>
  );
}
