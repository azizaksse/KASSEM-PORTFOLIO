import AuroraBackground from "@/components/AuroraBackground";
import GlassCard from "@/components/GlassCard";
import GlassNavbar from "@/components/GlassNavbar";

export default function Home() {
  return (
    <>
      <AuroraBackground />
      <GlassNavbar />
      <main className="min-h-screen px-6 pt-32 text-white">
        <div className="mx-auto max-w-6xl">
          <GlassCard className="mb-12 text-center">
            <h1 className="mb-4 text-5xl font-bold">Jacob Roberts</h1>
            <p className="text-xl text-white/70">
              I&apos;m a software engineer specializing in building exceptional digital experiences.
            </p>
            <button type="button" className="glass-button mt-6">
              Contact Me
            </button>
          </GlassCard>

          <h2 className="mb-8 text-3xl font-bold">Projects</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {[1, 2, 3, 4].map((project) => (
              <GlassCard key={project}>
                <h3 className="mb-2 text-xl font-bold">Project {project}</h3>
                <p className="text-white/60">A description of the project goes here.</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
