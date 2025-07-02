import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./responsive.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Toaster } from "react-hot-toast";
import DynamicTools from "@/components/DynamicTools";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-sans",
  adjustFontFallback: false, // Prevent font fallback adjustments
  preload: true
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
  adjustFontFallback: false, // Prevent font fallback adjustments
  preload: true
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover'
};

export const metadata: Metadata = {
  title: "Bishal Shrestha",
  description:
    "Developer",
  icons: [
    { rel: 'icon', url: '/assets/images/favicon_io/favicon.ico' },
    { rel: 'icon', url: '/assets/images/favicon_io/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    { rel: 'icon', url: '/assets/images/favicon_io/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    { rel: 'apple-touch-icon', url: '/assets/images/favicon_io/apple-touch-icon.png', sizes: '180x180' },
    { rel: 'manifest', url: '/assets/images/favicon_io/site.webmanifest' }
  ],
  keywords: [
    "developer",
    "designer",
    "React",
    "Python",
    "Game Testing",
    "Nepal",
    "Freelancer",
  ],
  authors: [{ name: "Bishal Shrestha" }],
  creator: "Bishal Shrestha",
  openGraph: {
    title: "Bishal Shrestha",
    description: "Developer",
    url: "https://bishal.dev",
    siteName: "Bishal Shrestha Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bishal Shrestha - Developer & Designer",
    description: "Developer",
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
        <link rel="icon" href="/assets/images/favicon_io/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/images/favicon_io/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/images/favicon_io/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/images/favicon_io/apple-touch-icon.png" />
        <link rel="manifest" href="/assets/images/favicon_io/site.webmanifest" />
      </head>
      <body className={`antialiased ${geist.variable} ${geistMono.variable}`}>
        <ThemeProvider>          {children}
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
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
