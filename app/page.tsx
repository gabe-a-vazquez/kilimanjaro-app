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

export default function Home() {
  // Sample data for the page
  const targetDate = new Date("June 26, 2025");
  const [camps, setCamps] = useState<Camp[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCamps() {
      try {
        const campsData = await getCamps();
        setCamps(campsData);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch camps:", error);
        setError("Failed to load camps data");
        setIsLoading(false);
      }
    }

    fetchCamps();
  }, []);

  if (isLoading) {
    return (
      <AppLayout>
        <PageCard>
          <div className="flex justify-center items-center min-h-[60vh]">
            <p>Loading camps data...</p>
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
          <Button isAnimated>Training Plan</Button>
        </Link>
      </PageCard>
    </AppLayout>
  );
}
