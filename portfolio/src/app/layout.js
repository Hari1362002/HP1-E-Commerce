import { Anton, Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const instrument = Instrument_Serif({
  weight: "400",
  style: ["italic"],
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata = {
  // The live origin — link previews resolve relative URLs against this.
  metadataBase: new URL("https://hariprasath-beige.vercel.app"),
  title: {
    default: "Hariprasath E — Full Stack Developer & Video Editor",
    template: "%s — Hariprasath E",
  },
  description:
    "Full stack developer and video editor based in Coimbatore, working remotely with clients anywhere. Storefronts, dashboards and browser tools — plus the reels that sell them.",
  openGraph: {
    title: "Hariprasath E — Full Stack Developer & Video Editor",
    description:
      "Storefronts, dashboards and browser tools — plus the reels that sell them.",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#f2f0ea",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${anton.variable} ${inter.variable} ${instrument.variable} ${jetbrains.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
