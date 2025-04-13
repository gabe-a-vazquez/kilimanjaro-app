"use client";

import React from "react";

interface PageCardProps {
  children: React.ReactNode;
}

export function PageCard({ children }: PageCardProps) {
  return <div>{children}</div>;
}

export default PageCard;
