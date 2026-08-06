import Portfolio from "@/components/Portfolio";

export const metadata = {
  title: "Hariprasath E — Frontend Developer & Video Editor",
  description:
    "Four shipped projects — a bike-parts storefront, a furniture store, a daily tracker and an offline image toolkit — each with the screenshot, the link, and how it was figured out.",
};

export default function Home() {
  return <Portfolio mode="dev" />;
}
