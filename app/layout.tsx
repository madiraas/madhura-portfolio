import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  style: ["normal", "italic"],
  axes: ["opsz"],
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Madhura Padman: I make messy projects move.",
  description:
    "Operations, coordination & execution for founders and growing teams.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`}
        style={
          {
            // Map the generated font variables onto the design tokens
            // the ported CSS expects, without touching every selector.
            "--serif": "var(--font-fraunces), Georgia, serif",
            "--sans":
              "var(--font-inter), -apple-system, BlinkMacSystemFont, sans-serif",
            "--mono": "var(--font-jetbrains), monospace",
          } as React.CSSProperties
        }
      >
        {children}
      </body>
    </html>
  );
}
