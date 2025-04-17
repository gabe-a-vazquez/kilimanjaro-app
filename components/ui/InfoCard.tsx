"use client";

import React, { useState } from "react";
import Image from "next/image";

interface InfoCardProps {
  title: string;
  children: React.ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  variant?: "default" | "highlight";
  className?: string;
}

export function InfoCard({
  title,
  children,
  imageSrc,
  imageAlt = "Information image",
  variant = "default",
  className = "",
}: InfoCardProps) {
  const [imgSrc, setImgSrc] = useState(imageSrc);
  const fallbackImage = "/images/tanzania-wildlife.webp";

  return (
    <div className={`info-card ${variant} ${className}`}>
      {imageSrc && (
        <div className="info-card-image-container">
          <Image
            src={imgSrc || fallbackImage}
            alt={imageAlt}
            className="info-card-image"
            fill
            onError={() => setImgSrc(fallbackImage)}
          />
        </div>
      )}
      <div className="info-card-content">
        <h3 className="info-card-title">{title}</h3>
        <div className="info-card-text">{children}</div>
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

        .info-card-image-container {
          width: 100px;
          height: 100px;
          position: relative;
          margin-right: 1rem;
          flex-shrink: 0;
          border-radius: 8px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
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

        :global(.info-card-image) {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
}

export default InfoCard;
