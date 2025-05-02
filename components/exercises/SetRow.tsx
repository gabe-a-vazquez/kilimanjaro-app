"use client";

import React from "react";

interface SetDetail {
  label: string;
  value: string | number | React.ReactNode;
}

interface SetRowProps {
  number: number;
  details: SetDetail[];
  rightElement?: React.ReactNode;
  className?: string;
}

const SetRow: React.FC<SetRowProps> = ({
  number,
  details,
  rightElement,
  className = "",
}) => {
  return (
    <div className={`set-row ${className}`}>
      <div className="set-label">{number}</div>
      <div className="set-details">
        {details.map((detail, index) => (
          <div key={index} className="set-detail">
            <div className="set-detail-label">{detail.label}</div>
            <div className="set-detail-value">{detail.value}</div>
          </div>
        ))}
      </div>
      {rightElement && <div className="set-right-element">{rightElement}</div>}
    </div>
  );
};

export default SetRow;
