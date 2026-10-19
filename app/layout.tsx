import type { Metadata } from "next";
import { Manrope, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ClipMax — AI Video Clipping Studio & Clipper Bounty Marketplace",
  description:
    "Turn long videos & livestreams into ranked 9:16 viral shorts with kinetic captions, 1-click mobile bot approval, and pay-per-view brand bounties.",
  keywords: [
    "AI Video Clipping",
    "TikTok Shorts",
    "OpusClip Alternative",
    "Vugola AI",
    "Content Repurposing",
    "Viral Moment Detection",
    "Video Bounties",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${inter.variable} ${ibmPlexMono.variable} dark`}
    >
      <body className="min-h-screen bg-canvas text-slate-100 antialiased selection:bg-primary/20 selection:text-primary">
        {children}
      </body>
    </html>
  );
}
