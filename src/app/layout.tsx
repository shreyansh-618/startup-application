import type { Metadata } from "next";
import {
  Instrument_Sans,
  Instrument_Serif,
  Spline_Sans_Mono,
} from "next/font/google";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const splineSansMono = Spline_Sans_Mono({
  variable: "--font-spline-sans-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "WhatBytes — Apply: We back five startups a quarter.",
  description:
    "We don't take clients — we choose five founders and invest in building their product. Apply now for our venture studio program.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSans.variable} ${instrumentSerif.variable} ${splineSansMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
