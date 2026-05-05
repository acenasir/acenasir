import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PromptPro - AI Prompt Packs for Service Business Owners",
  description: "Industry-specific AI prompts that save you hours. Built for real estate agents, fitness trainers, consultants, beauty professionals, and more.",
  keywords: ["AI prompts", "ChatGPT prompts", "business prompts", "service business", "real estate prompts", "fitness prompts"],
  openGraph: {
    title: "PromptPro - AI Prompt Packs for Service Business Owners",
    description: "Industry-specific AI prompts that save you hours.",
    url: "https://promptpro.vercel.app",
    siteName: "PromptPro",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PromptPro - AI Prompt Packs",
    description: "Industry-specific AI prompts that save you hours.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
