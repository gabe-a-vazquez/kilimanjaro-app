"use client";

import React, { ReactNode } from "react";

interface ExerciseCardProps {
  name: string;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
}

export function ExerciseCard({
  name,
  children,
  icon = "🏋️",
  className = "",
}: ExerciseCardProps) {
  return (
    <div className={`exercise-card ${className}`}>
      <div className="exercise-header">
        <div className="exercise-name">{name}</div>
        <div className="exercise-icon">{icon}</div>
      </div>
      <div className="exercise-content">{children}</div>

      <style jsx>{`
        .exercise-card {
          background: linear-gradient(
            145deg,
            rgba(26, 69, 52, 0.5),
            rgba(12, 44, 29, 0.5)
          );
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.05);
          margin-bottom: 1rem;
          box-shadow: 0 15px 25px rgba(0, 0, 0, 0.2);
          color: white;
          width: 100%;
        }

        .exercise-header {
          padding: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: linear-gradient(
            145deg,
            rgba(32, 85, 64, 0.6),
            rgba(26, 69, 52, 0.6)
          );
        }

        .exercise-name {
          font-weight: 600;
          font-size: 1.125rem;
          letter-spacing: -0.01em;
        }

        .exercise-icon {
          font-size: 1.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .exercise-content {
          padding: 1rem;
        }
      `}</style>
    </div>
  );
}

export default ExerciseCard;
