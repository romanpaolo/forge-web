import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Forge — One Walk. Zero Typing. Job-Ready Data.',
  description: 'Forge turns a single job walk into structured scope, tasks by trade, and Buildertrend-ready exports. Built for general contractors.',
  keywords: ['general contractor', 'job walk', 'ScopeSnap', 'Buildertrend', 'construction AI', 'scope of work'],
  openGraph: {
    title: 'Forge — The AI Job Walk Tool for Contractors',
    description: 'One walk in. Structured scope out. Save 20+ minutes per job.',
    type: 'website',
    url: 'https://forgebuild.io',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Forge — One Walk. Zero Typing.',
    description: 'AI-powered job walk tool for general contractors.',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} ${outfit.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
