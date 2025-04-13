"use client";

import React from "react";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return <div className="app-layout">{children}</div>;
}

export default AppLayout;
