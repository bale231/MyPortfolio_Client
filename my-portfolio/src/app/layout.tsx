import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://luigibalestrucci.vercel.app'), // Aggiorna con il tuo dominio
  title: {
    default: "Luigi Balestrucci | Full Stack Developer & AI Specialist",
    template: "%s | Luigi Balestrucci"
  },
  description: "Portfolio di Luigi Balestrucci - Full Stack Developer specializzato in React, Next.js, TypeScript, Node.js e integrazione AI. Scopri i miei progetti e competenze.",
  keywords: [
    "Luigi Balestrucci",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "AI Developer",
    "Web Developer Italia",
    "Portfolio Developer",
    "Frontend Developer",
    "Backend Developer"
  ],
  authors: [{ name: "Luigi Balestrucci", url: "https://github.com/bale231" }],
  creator: "Luigi Balestrucci",
  publisher: "Luigi Balestrucci",
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "https://luigibalestrucci.vercel.app",
    title: "Luigi Balestrucci | Full Stack Developer & AI Specialist",
    description: "Portfolio di Luigi Balestrucci - Full Stack Developer specializzato in React, Next.js, TypeScript e AI",
    siteName: "Luigi Balestrucci Portfolio",
    images: [
      {
        url: "/images/images-profile.png",
        width: 1200,
        height: 630,
        alt: "Luigi Balestrucci - Full Stack Developer"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Luigi Balestrucci | Full Stack Developer",
    description: "Portfolio di Luigi Balestrucci - Full Stack Developer specializzato in React, Next.js e AI",
    images: ["/images/images-profile.png"],
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
    // Aggiungi qui dopo aver verificato su Google Search Console
    // google: 'your-verification-code',
  },
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
