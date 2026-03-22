import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/ui/SmoothScrollProvider";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import NoiseOverlay from "@/components/ui/NoiseOverlay";
import Preloader from "@/components/ui/Preloader";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alex Morgan | Full Stack Developer",
  description:
    "Premium portfolio of Alex Morgan — Full Stack Developer & Problem Solver. Building immersive digital experiences.",
  keywords: ["portfolio", "developer", "full stack", "react", "nextjs"],
  openGraph: {
    title: "Alex Morgan | Full Stack Developer",
    description: "Premium portfolio of Alex Morgan — Full Stack Developer",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable}`}
      style={{ background: "#0B0B0B" }}
    >
      <body>
        <SmoothScrollProvider>
          <Preloader />
          <NoiseOverlay />
          <CustomCursor />
          <ScrollProgress />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
