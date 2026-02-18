import type { Metadata } from "next";
import { Playfair_Display, Inter, Libre_Franklin } from "next/font/google";
import "./globals.css";
import { AgentationProvider } from "@/components/AgentationProvider";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const libreFranklin = Libre_Franklin({
  subsets: ["latin"],
  variable: "--font-ui",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Revival Motorworks | Classic & Vintage Vehicle Specialists",
  description: "Expert servicing, restoration, and motorsport preparation for classic and vintage vehicles in Surrey, UK. Over 10 years of automotive excellence.",
  keywords: "classic car restoration, vintage car servicing, motorsport preparation, Surrey, Goodwood, classic vehicle specialists",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${libreFranklin.variable} scroll-smooth`}>
      <body className="font-body antialiased">
        {children}
        <AgentationProvider />
      </body>
    </html>
  );
}
