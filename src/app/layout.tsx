import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ReactNode } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Team Dinesh - Fitness Transformations",
  description: "Premium fitness transformations with verified results and expert coaching by Team Dinesh",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative text-white bg-black">
        {/* Full-screen Background Image (100% width x 100% height, cover, centered) */}
        <div
          className="fixed inset-0 w-full h-full -z-20 pointer-events-none bg-cover bg-no-repeat"
          style={{
            backgroundImage: "url('/background.jpg')",
            backgroundPosition: "center center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
          aria-hidden="true"
        />
        {/* Subtle dark overlay for optimal text contrast while keeping image sharp and clear */}
        <div
          className="fixed inset-0 w-full h-full -z-10 pointer-events-none bg-gradient-to-b from-black/55 via-black/30 to-black/65"
          aria-hidden="true"
        />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
