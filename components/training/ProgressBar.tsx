"use client";

import React, { useState } from "react";

interface CampInfo {
  name: string;
  elevation: string;
}

interface ProgressBarProps {
  camps: CampInfo[];
  currentElevation: string;
  approachingCamp: string;
  progressPercentage: number;
  backgroundImage?: string;
  className?: string;
}

export function ProgressBar({
  camps,
  currentElevation,
  approachingCamp,
  progressPercentage,
  backgroundImage = "/images/trail-background.webp",
  className = "",
}: ProgressBarProps) {
  const [showInfo, setShowInfo] = useState(false);

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  return (
    <div
      className={`trail-visualization w-full ${className}`}
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(26, 69, 52, 0.65), rgba(12, 44, 29, 0.7)), url("${backgroundImage}")`,
      }}
    >
      <div className="camp-container">
        <div className="trail-line"></div>

        {/* Completed trail section */}
        <div
          className="completed-trail"
          style={{ height: `${progressPercentage}%` }}
        ></div>

        {/* User position indicator */}
        <div
          className="user-position"
          onClick={toggleInfo}
          onKeyPress={(e) => e.key === "Enter" && toggleInfo()}
          role="button"
          tabIndex={0}
          aria-label="Show current elevation"
          title="Click to show current elevation"
          style={{ bottom: `${progressPercentage}%` }}
        ></div>

        {/* Camp locations */}
        {camps.map((camp, index) => {
          // Calculate if this camp has been passed based on index and progress percentage
          // Assuming camps are ordered from top to bottom (summit to base)
          // The total height is divided equally among camps
          const campPositionPercentage =
            ((camps.length - 1 - index) / (camps.length - 1)) * 100;
          const isPassed = progressPercentage >= campPositionPercentage;

          return (
            <div className="camp-item" key={index}>
              <div className="camp-info">
                <div className="camp-name">{camp.name}</div>
                <div className="camp-elevation">{camp.elevation}</div>
              </div>
              <div className={`camp-dot ${isPassed ? "passed" : ""}`}></div>
            </div>
          );
        })}
      </div>

      {/* Progress information overlay - only shown when user position is clicked */}
      {showInfo && (
        <div className="progress-info">
          <div className="elevation-info">{currentElevation}</div>
          <div className="approaching-info">Approaching: {approachingCamp}</div>
        </div>
      )}

      <style jsx>{`
        .trail-visualization {
          width: 100%;
          height: 50vh;
          min-height: 250px;
          max-height: 500px;
          background: linear-gradient(
              135deg,
              rgba(26, 69, 52, 0.65),
              rgba(12, 44, 29, 0.7)
            ),
            url("${backgroundImage}");
          background-size: cover;
          background-position: center;
          position: relative;
          overflow: hidden;
          border-radius: 8px;
          padding: 0.5rem;
        }

        .camp-container {
          display: flex;
          flex-direction: column;
          height: 100%;
          justify-content: space-between;
          position: relative;
        }

        .trail-line {
          position: absolute;
          width: 2px;
          height: 100%;
          top: 0;
          right: clamp(20px, 5vw, 30px);
          z-index: 1;
          background: rgba(255, 255, 255, 0.8);
          filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.3));
        }

        .camp-item {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          position: relative;
          z-index: 2;
          padding-right: clamp(40px, 10vw, 50px);
        }

        .camp-info {
          text-align: right;
          margin-right: clamp(10px, 2vw, 15px);
        }

        .camp-name {
          font-size: clamp(0.75rem, 2vw, 1rem);
          font-weight: 600;
          color: white;
          white-space: nowrap;
          letter-spacing: -0.01em;
        }

        .camp-elevation {
          font-size: clamp(0.7rem, 1.5vw, 0.875rem);
          color: rgba(255, 255, 255, 0.9);
          font-feature-settings: "tnum";
          font-variant-numeric: tabular-nums;
          font-weight: 400;
        }

        .camp-dot {
          width: clamp(12px, 4vw, 20px);
          height: clamp(12px, 4vw, 20px);
          background-color: rgba(255, 255, 255, 0.9);
          border-radius: 50%;
          position: absolute;
          right: clamp(14px, 3vw, 21px);
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.7);
          transition: all 0.3s ease;
        }

        .camp-dot.passed {
          background: linear-gradient(145deg, #ff9967, #ff7440);
          box-shadow: 0 0 15px rgba(255, 127, 80, 0.7);
        }

        /* User position indicator */
        .user-position {
          position: absolute;
          width: clamp(12px, 3vw, 18px);
          height: clamp(12px, 3vw, 18px);
          background: linear-gradient(145deg, #ff9967, #ff7440);
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.9);
          box-shadow: 0 0 20px rgba(255, 127, 80, 0.5);
          z-index: 4;
          right: clamp(15px, 3vw, 22px);
          bottom: ${progressPercentage}%;
          animation: pulse-glow 2s infinite;
          cursor: pointer;
          transition: transform 0.2s ease;
        }

        .user-position:hover {
          transform: scale(1.2);
        }

        .user-position:active {
          transform: scale(0.95);
        }

        @keyframes pulse-glow {
          0% {
            box-shadow: 0 0 0 0 rgba(255, 127, 80, 0.7);
          }
          70% {
            box-shadow: 0 0 0 15px rgba(255, 127, 80, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(255, 127, 80, 0);
          }
        }

        /* Completed trail section */
        .completed-trail {
          position: absolute;
          width: 2px;
          bottom: 0;
          right: clamp(20px, 5vw, 30px);
          z-index: 2;
          height: ${progressPercentage}%;
          background: linear-gradient(to top, #ff7440, #ff9967);
          filter: drop-shadow(0 0 5px rgba(255, 127, 80, 0.5));
        }

        .progress-info {
          position: absolute;
          left: clamp(0.5rem, 2vw, 1rem);
          right: clamp(0.5rem, 2vw, 1rem);
          bottom: clamp(0.5rem, 2vw, 1rem);
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          color: white;
          padding: clamp(0.75rem, 3vw, 1.25rem);
          text-align: center;
          z-index: 10;
          width: calc(100% - clamp(1rem, 4vw, 2rem));
          border-radius: clamp(8px, 3vw, 16px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
          overflow: hidden;
          animation: fade-in 0.3s ease-out;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .elevation-info {
          font-size: clamp(1rem, 2.5vw, 1.25rem);
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: white;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
          letter-spacing: -0.02em;
        }

        .approaching-info {
          font-size: clamp(0.8rem, 2vw, 0.9375rem);
          color: rgba(255, 255, 255, 0.9);
          font-weight: 400;
        }

        @media (min-width: 1280px) {
          .progress-info {
            max-width: 80%;
            margin: 0 auto;
            left: 0;
            right: 0;
          }
        }
      `}</style>
    </div>
  );
}

export default ProgressBar;
