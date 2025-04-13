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
    <div className={`countdown-container ${className}`}>
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
    </div>
  );
}

export default CountdownTimer;
