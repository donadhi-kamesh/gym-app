import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ReactNode } from "react";

const display = Anton({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Team Dinesh — Elite Fitness Transformations",
  description:
    "Verified body transformations, elite coaching, nutrition and strength programs by Team Dinesh.",
};

import { SiteProvider } from "@/context/SiteContext";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative text-zinc-100 bg-[#060607]">
        <SiteProvider>
          {/* Full-screen Background Image (100% width x 100% height, cover, centered) — DO NOT CHANGE */}
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
          {/* Cinematic overlay: keeps image visible while guaranteeing text contrast */}
          <div
            className="fixed inset-0 w-full h-full -z-10 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.38) 38%, rgba(0,0,0,0.55) 72%, rgba(0,0,0,0.82) 100%)",
            }}
            aria-hidden="true"
          />
          <Navbar />
          <div className="flex-1">{children}</div>
        </SiteProvider>
      </body>
    </html>
  );
}
