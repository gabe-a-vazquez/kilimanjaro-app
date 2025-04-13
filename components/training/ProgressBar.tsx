"use client";

import React from "react";

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
}

export function ProgressBar({
  camps,
  currentElevation,
  approachingCamp,
  progressPercentage,
  backgroundImage = "/images/trail-background.webp",
}: ProgressBarProps) {
  return (
    <div className="trail-visualization">
      <div className="camp-container">
        <div className="trail-line"></div>

        {/* Completed trail section */}
        <div className="completed-trail"></div>

        {/* User position indicator */}
        <div className="user-position"></div>

        {/* Camp locations */}
        {camps.map((camp, index) => (
          <div className="camp-item" key={index}>
            <div className="camp-info">
              <div className="camp-name">{camp.name}</div>
              <div className="camp-elevation">{camp.elevation}</div>
            </div>
            <div className="camp-dot"></div>
          </div>
        ))}
      </div>

      {/* Progress information overlay */}
      <div className="progress-info">
        <div className="elevation-info">{currentElevation}</div>
        <div className="approaching-info">Approaching: {approachingCamp}</div>
      </div>

      <style jsx>{`
        .trail-visualization {
          width: 100%;
          height: 55%;
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
          border-radius: 0;
          padding: 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
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
          right: 30px;
          z-index: 1;
          background-image: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.7) 50%,
            rgba(255, 255, 255, 0.2) 0%
          );
          background-position: right;
          background-size: 2px 15px;
          background-repeat: repeat-y;
          background-color: transparent;
          filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.3));
        }

        .camp-item {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          position: relative;
          z-index: 2;
          padding-right: 50px;
        }

        .camp-info {
          text-align: right;
          margin-right: 15px;
        }

        .camp-name {
          font-size: 1rem;
          font-weight: 600;
          color: white;
          white-space: nowrap;
          letter-spacing: -0.01em;
        }

        .camp-elevation {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.9);
          font-feature-settings: "tnum";
          font-variant-numeric: tabular-nums;
          font-weight: 400;
        }

        .camp-dot {
          width: 20px;
          height: 20px;
          background-color: rgba(255, 255, 255, 0.9);
          border-radius: 50%;
          position: absolute;
          right: 21px;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.7);
        }

        /* User position indicator */
        .user-position {
          position: absolute;
          width: 18px;
          height: 18px;
          background: linear-gradient(145deg, #ff9967, #ff7440);
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.9);
          box-shadow: 0 0 20px rgba(255, 127, 80, 0.5);
          z-index: 4;
          right: 22px;
          bottom: ${progressPercentage}%;
          animation: pulse-glow 2s infinite;
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
          right: 30px;
          z-index: 2;
          height: ${progressPercentage}%;
          background-image: linear-gradient(
            to bottom,
            rgba(255, 127, 80, 0.9) 50%,
            rgba(255, 127, 80, 0.3) 0%
          );
          background-position: right;
          background-size: 2px 15px;
          background-repeat: repeat-y;
          background-color: transparent;
          filter: drop-shadow(0 0 5px rgba(255, 127, 80, 0.5));
        }

        .progress-info {
          position: absolute;
          left: 1rem;
          right: 1rem;
          bottom: 1rem;
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          color: white;
          padding: 1.25rem;
          text-align: center;
          z-index: 10;
          width: calc(100% - 2rem);
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
          overflow: hidden;
        }

        .elevation-info {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: white;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
          letter-spacing: -0.02em;
        }

        .approaching-info {
          font-size: 0.9375rem;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 400;
        }
      `}</style>
    </div>
  );
}

export default ProgressBar;
