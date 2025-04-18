"use client";

import React from "react";

interface InfoCardProps {
  title: string;
  children: React.ReactNode;
  variant?: "default" | "highlight";
  className?: string;
  link?: string;
}

export function InfoCard({
  title,
  children,
  variant = "default",
  className = "",
  link,
}: InfoCardProps) {
  return (
    <div className={`info-card ${variant} ${className}`}>
      <div className="info-card-content">
        <h3 className="info-card-title">{title}</h3>
        <div className="info-card-text">{children}</div>
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="info-card-link"
          >
            Learn More →
          </a>
        )}
      </div>
      <style jsx>{`
        .info-card {
          width: 100%;
          background: linear-gradient(
            145deg,
            rgba(26, 69, 52, 0.7),
            rgba(12, 44, 29, 0.7)
          );
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          height: auto;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          position: relative;
          padding: 1rem;
          margin: 1rem 0;
          box-shadow: 0 15px 25px rgba(0, 0, 0, 0.2);
          max-width: 300px;
          margin: 1.5rem auto 0;
        }

        .highlight {
          border: 1px solid rgba(255, 127, 80, 0.15);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25),
            0 0 0 1px rgba(255, 255, 255, 0.1),
            0 0 0 3px rgba(255, 127, 80, 0.2),
            inset 0 0 20px rgba(255, 127, 80, 0.1);
        }

        .info-card-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .info-card-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.95);
          margin: 0 0 0.5rem 0;
          letter-spacing: -0.01em;
        }

        .info-card-text {
          font-size: 0.9375rem;
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.5;
          font-weight: 400;
        }

        .info-card-link {
          font-size: 0.875rem;
          color: rgba(255, 127, 80, 0.9);
          text-decoration: none;
          margin-top: 0.75rem;
          display: inline-block;
          transition: all 0.2s ease;
          opacity: 0.8;
        }

        .info-card-link:hover {
          opacity: 1;
          color: rgba(255, 127, 80, 1);
          transform: translateX(2px);
        }
      `}</style>
    </div>
  );
}

export default InfoCard;
//https://upload.wikimedia.org/wikipedia/commons/3/3f/Kilimanjaro_from_Amboseli.jpg
