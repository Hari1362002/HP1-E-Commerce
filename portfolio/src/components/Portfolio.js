import Nav from "./Nav";
import Hero from "./Hero";
import DevWork from "./DevWork";
import VideoWork from "./VideoWork";
import About from "./About";
import Contact from "./Contact";

/**
 * One shell, two moods.
 *
 * `mode` comes from the route rather than client state, so the server already
 * knows which palette to send — the dark side never flashes light on the way
 * in, and /video is a real, shareable, indexable page.
 */
export default function Portfolio({ mode }) {
  return (
    <div className={mode === "video" ? "mode-video" : "mode-dev"}>
      <Nav mode={mode} />
      <main>
        <Hero mode={mode} />
        {mode === "video" ? <VideoWork /> : <DevWork />}
        <About mode={mode} />
        <Contact mode={mode} />
      </main>
    </div>
  );
}
