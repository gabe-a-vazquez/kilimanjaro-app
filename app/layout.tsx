import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kilimanjaro Prep Training",
  description:
    "Train effectively for your Kilimanjaro climb with personalized workouts",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  themeColor: "#0a2e1e",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-b from-[#0a2e1e] to-[#061f15] min-h-screen text-white`}
      >
        {children}
      </body>
    </html>
  );
}
