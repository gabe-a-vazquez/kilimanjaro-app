import { AppLayout } from "@/components/layout/AppLayout";
import { PageCard } from "@/components/layout/PageCard";
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
    <AppLayout>
      <PageCard>
        {/* Countdown Timer */}
        <CountdownTimer targetDate={targetDate} />

        {/* Trail Visualization */}
        <ProgressBar
          camps={camps}
          currentElevation="Current Elevation: ~1,800 m (Rainforest Zone)"
          approachingCamp="Machame Camp"
          progressPercentage={20}
        />

        {/* Fun Fact */}
        <div style={{ padding: "0 1rem" }}>
          <InfoCard
            title="Tanzania Fun Fact"
            imageSrc="/images/tanzania-wildlife.webp"
          >
            Tanzania is home to over 4 million wild animals and 1,000 bird
            species.
          </InfoCard>

          {/* Navigation Button */}
          <Link
            href="/workouts"
            style={{ display: "block", margin: "1rem 0 1.5rem" }}
          >
            <Button isAnimated>Start Workout</Button>
          </Link>
        </div>
      </PageCard>
    </AppLayout>
  );
}
