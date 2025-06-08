import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./responsive.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Toaster } from "react-hot-toast";
import DynamicTools from "@/components/DynamicTools";

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-sans",
  adjustFontFallback: false // Prevent font fallback adjustments
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
  adjustFontFallback: false // Prevent font fallback adjustments
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover'
};

export const metadata: Metadata = {
  title: "Bishal Shrestha - Developer & Designer",
  description:
    "Versatile developer and product designer from Nepal. Specializing in React, Node.js, Game Testing, Python, Web Development, and Teaching Programming.",
  icons: {
    icon: '/favicon.ico',
  },
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
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`antialiased ${geist.variable} ${geistMono.variable}`}>
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
          {process.env.NODE_ENV === 'development' && <DynamicTools />}
        </ThemeProvider>
      </body>
    </html>
  );
}
