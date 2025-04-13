"use client";

import React from "react";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  fullWidth?: boolean;
  isAnimated?: boolean;
}

export function Button({
  children,
  variant = "primary",
  fullWidth = true,
  isAnimated = false,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`button ${variant} ${fullWidth ? "full-width" : ""} ${
        isAnimated ? "animated" : ""
      } ${className}`}
      {...props}
    >
      {children}
      <style jsx>{`
        .button {
          border-radius: 12px;
          padding: 1rem;
          font-size: 1rem;
          font-weight: 500;
          text-align: center;
          cursor: pointer;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 150ms ease;
          height: 3.5rem;
          color: white;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(255, 255, 255, 0.1);
          position: relative;
          z-index: 1;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
          letter-spacing: 0;
        }

        .full-width {
          width: 100%;
        }

        .primary {
          background: linear-gradient(
            145deg,
            var(--orange-gradient-start, #ff9967),
            var(--orange-gradient-end, #ff7440)
          );
        }

        .secondary {
          background: linear-gradient(
            145deg,
            var(--highlight-gradient-start, #3a9d6b),
            var(--highlight-gradient-end, #1f5a3d)
          );
        }

        .button:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4),
            0 0 0 1px rgba(255, 255, 255, 0.15);
        }

        .button:active {
          transform: translateY(1px);
          box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2),
            0 0 0 1px rgba(255, 255, 255, 0.05);
        }

        .animated {
          overflow: hidden;
        }

        .animated::after {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            to right,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          transform: skewX(-25deg);
          animation: button-shine 5s infinite;
        }

        .primary.animated::before {
          content: "";
          position: absolute;
          inset: -3px;
          background: linear-gradient(
            145deg,
            var(--orange-gradient-start, #ff9967),
            var(--orange-gradient-end, #ff7440)
          );
          border-radius: 20px;
          z-index: -1;
          box-shadow: 0 0 30px rgba(255, 127, 80, 0.7);
          opacity: 0.9;
          animation: button-glow 3s infinite alternate;
        }

        @keyframes button-shine {
          0% {
            left: -100%;
          }
          20%,
          100% {
            left: 150%;
          }
        }

        @keyframes button-glow {
          0% {
            box-shadow: 0 0 20px rgba(255, 127, 80, 0.5);
          }
          100% {
            box-shadow: 0 0 40px rgba(255, 127, 80, 0.8);
          }
        }
      `}</style>
    </button>
  );
}

export default Button;
