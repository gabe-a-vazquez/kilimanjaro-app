"use client";

import React, { useState, useEffect } from "react";

interface CountdownTimerProps {
  targetDate: Date;
  className?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownTimer({
  targetDate,
  className = "",
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    };

    // Set the initial time left
    setTimeLeft(calculateTimeLeft());

    // Update time every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Clear interval on component unmount
    return () => clearInterval(timer);
  }, [targetDate]);

  const formatTimeUnit = (value: number) => {
    return value < 10 ? `0${value}` : value.toString();
  };

  return (
    <div className={`countdown-container w-full ${className}`}>
      <div className="countdown-numbers">
        <div className="countdown-unit">
          <div className="countdown-number">
            {formatTimeUnit(timeLeft.days)}
          </div>
          <div className="countdown-label">Days</div>
        </div>
        <div className="countdown-unit">
          <div className="countdown-number">
            {formatTimeUnit(timeLeft.hours)}
          </div>
          <div className="countdown-label">Hours</div>
        </div>
        <div className="countdown-unit">
          <div className="countdown-number">
            {formatTimeUnit(timeLeft.minutes)}
          </div>
          <div className="countdown-label">Mins</div>
        </div>
        <div className="countdown-unit">
          <div className="countdown-number">
            {formatTimeUnit(timeLeft.seconds)}
          </div>
          <div className="countdown-label">Secs</div>
        </div>
      </div>

      <style jsx>{`
        .countdown-container {
          width: 100%;
          background: linear-gradient(
            to bottom,
            rgba(10, 40, 25, 0.8),
            rgba(10, 40, 25, 0.7)
          );
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          padding: 0.75rem 1rem;
          text-align: center;
          color: white;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .countdown-numbers {
          display: flex;
          justify-content: center;
          width: 100%;
        }

        .countdown-unit {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 0 0.5rem;
          position: relative;
        }

        .countdown-unit:not(:last-child)::after {
          content: ":";
          position: absolute;
          right: -0.75rem;
          top: 0;
          font-size: 1.5rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.7);
        }

        .countdown-number {
          font-size: 2rem;
          font-weight: 600;
          color: white;
          line-height: 1;
          font-feature-settings: "tnum";
          font-variant-numeric: tabular-nums;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
          letter-spacing: -0.01em;
        }

        .countdown-label {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.7);
          margin-top: 0.25rem;
          font-weight: 500;
          letter-spacing: 0;
        }
      `}</style>
    </div>
  );
}

export default CountdownTimer;
