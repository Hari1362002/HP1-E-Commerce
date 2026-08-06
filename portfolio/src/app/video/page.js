import Portfolio from "@/components/Portfolio";

export const metadata = {
  title: "Video Editing & Design",
  description:
    "Short-form reels, YouTube edits, colour grading and social design — DaVinci Resolve, Premiere Pro, After Effects, Figma and Canva.",
};

export const viewport = {
  themeColor: "#0b0b0c",
};

export default function VideoPage() {
  return <Portfolio mode="video" />;
}
