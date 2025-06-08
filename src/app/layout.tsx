import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Toaster } from "react-hot-toast";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Ensure consistent class names
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap", // Ensure consistent class names
});

export const metadata: Metadata = {
  title: "Bishal Shrestha - Developer & Designer",
  description:
    "Versatile developer and product designer from Nepal. Specializing in React, Node.js, Game Testing, Python, Web Development, and Teaching Programming.",
  keywords: [
    "developer",
    "designer",
    "React",
    "Node.js",
    "Python",
    "Game Testing",
    "Nepal",
    "Freelancer",
  ],
  authors: [{ name: "Bishal Shrestha" }],
  creator: "Bishal Shrestha",
  openGraph: {
    title: "Bishal Shrestha - Developer & Designer",
    description: "Versatile developer and product designer from Nepal",
    url: "https://bishal.dev",
    siteName: "Bishal Shrestha Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bishal Shrestha - Developer & Designer",
    description: "Versatile developer and product designer from Nepal",
    creator: "@BishalABPS52",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        <ThemeProvider>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: "var(--card-background)",
                color: "var(--foreground)",
                border: "1px solid var(--border)",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
