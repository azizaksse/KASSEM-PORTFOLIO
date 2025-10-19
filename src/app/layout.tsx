import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/lenis-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { PerformanceOptimizer } from "@/components/performance-optimizer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kassem Bell — Liquid Glass Web Experiences",
  description:
    "Kassem Bell crafts liquid-glass web experiences that combine motion, clarity, and high-performance engineering for ambitious brands.",
  keywords: [
    "liquid glass",
    "creative developer",
    "next.js portfolio",
    "motion design",
    "frontend engineer",
    "UI UX designer",
  ],
  authors: [{ name: "Kassem Bell" }],
  openGraph: {
    title: "Kassem Bell — Liquid Glass Web Experiences",
    description:
      "Immersive digital products designed with narrative, motion, and engineering polish.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#040810" />
        <meta name="color-scheme" content="dark" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PerformanceOptimizer>
          <ThemeProvider>
            <LenisProvider>{children}</LenisProvider>
          </ThemeProvider>
        </PerformanceOptimizer>
      </body>
    </html>
  );
}
