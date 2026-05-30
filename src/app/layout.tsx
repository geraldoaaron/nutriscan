import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

import { LanguageProvider } from "@/components/language-provider";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NutriScan AI — AI-Powered Nutrition Analyzer",
  description:
    "Upload a meal photo and instantly receive AI-powered nutritional analysis including calories, protein, carbs, and fat. Perfect for fitness enthusiasts and calorie tracking.",
  keywords: [
    "nutrition",
    "AI",
    "food analysis",
    "calorie counter",
    "macro tracker",
    "fitness",
    "meal scanner",
  ],
  authors: [{ name: "NutriScan AI" }],
  openGraph: {
    title: "NutriScan AI — AI-Powered Nutrition Analyzer",
    description:
      "Upload a meal photo and instantly receive AI-powered nutritional analysis.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a1a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <TooltipProvider>
              {children}
            </TooltipProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
