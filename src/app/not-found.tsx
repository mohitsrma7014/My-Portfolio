import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center pt-24">
      <div className="grid-bg absolute inset-0 opacity-50" />
      <div className="container-x relative text-center font-mono">
        <p className="text-sm text-accent">Traceback (most recent call last):</p>
        <h1 className="mt-4 font-display text-5xl font-semibold tracking-tight sm:text-7xl">404 · PageNotFoundError</h1>
        <p className="mx-auto mt-6 max-w-md text-muted">This page doesn&apos;t exist. My projects do, though.</p>
        <div className="mt-10 flex justify-center gap-3 font-sans">
          <Link href="/" className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-bg">Back home</Link>
          <Link href="/projects" className="rounded-full border border-line-strong px-6 py-3 text-sm">See projects</Link>
        </div>
      </div>
    </section>
  );
}
