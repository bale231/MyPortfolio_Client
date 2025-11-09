import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Luigi Balestrucci | Full Stack Developer",
  description: "Portfolio personale di Luigi Balestrucci - Full Stack Developer specializzato in React, Next.js, TypeScript e AI",
  keywords: ["Luigi Balestrucci", "Full Stack Developer", "React", "Next.js", "TypeScript", "Portfolio"],
  authors: [{ name: "Luigi Balestrucci" }],
  openGraph: {
    title: "Luigi Balestrucci | Full Stack Developer",
    description: "Portfolio personale di Luigi Balestrucci - Full Stack Developer",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
