"use client";

import React from "react";

interface TipsListProps {
  tips: string[];
  title?: string;
  videoUrl?: string;
  className?: string;
}

export function TipsList({
  tips,
  title = "Form Tips",
  videoUrl,
  className = "",
}: TipsListProps) {
  return (
    <div className={`form-tips ${className}`}>
      <div className="form-tips-header">
        <div className="tips-icon">💡</div>
        <div>{title}</div>
      </div>
      <div className="form-tips-content">
        {tips.map((tip, index) => (
          <div className="form-tips-item" key={index}>
            {tip}
          </div>
        ))}
        {videoUrl && (
          <a
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="video-link"
          >
            WATCH VIDEO
          </a>
        )}
      </div>

      <style jsx>{`
        .form-tips {
          margin-top: 1rem;
          background: rgba(0, 0, 0, 0.15);
          border-radius: 8px;
          padding: 0.75rem;
        }

        .form-tips-header {
          font-weight: 500;
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          color: white;
        }

        .tips-icon {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: rgba(255, 127, 80, 0.2);
          color: #ff9967;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 0.5rem;
          font-size: 0.7rem;
        }

        .form-tips-content {
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.5;
        }

        .form-tips-item {
          margin-bottom: 0.4rem;
          display: flex;
          align-items: baseline;
          font-size: 0.9375rem;
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.5;
          position: relative;
          padding-left: 1rem;
        }

        .form-tips-item::before {
          content: "•";
          position: absolute;
          left: 0;
          color: #ff9967;
        }

        .video-link {
          display: block;
          margin: 1rem auto 0;
          padding: 0.5rem 1rem;
          background: linear-gradient(145deg, #3a9d6b, #1f5a3d);
          border-radius: 12px;
          transition: all 150ms ease;
          text-decoration: none;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
          border: none;
          text-align: center;
          color: white;
          font-size: 0.85rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          width: fit-content;
          min-width: 120px;
          position: relative;
          z-index: 1;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        }

        .video-link::before {
          content: "";
          position: absolute;
          inset: -2px;
          background: linear-gradient(145deg, #ff9967, #ff7440);
          border-radius: 14px;
          z-index: -1;
          box-shadow: 0 0 15px rgba(255, 127, 80, 0.4);
          opacity: 0.8;
        }

        .video-link:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
        }

        .video-link:active {
          transform: translateY(1px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
}

export default TipsList;
