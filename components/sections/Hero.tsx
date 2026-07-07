"use client";

import dynamic from "next/dynamic";
import { bio } from "@/data/bio";

const HeroScene = dynamic(() => import("@/components/scenes/HeroScene"), {
  ssr: false,
});

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div className="absolute inset-0 -z-10 opacity-60">
        <HeroScene />
      </div>
      <h1 className="font-display text-4xl font-bold tracking-tight text-(--color-paper) sm:text-6xl">
        {bio.name}
      </h1>
      <p className="mt-4 font-display text-xl text-(--color-circuit) sm:text-2xl">
        {bio.headline}
      </p>
      <p className="mt-6 max-w-xl text-(--color-muted)">{bio.summary}</p>
      <div className="mt-8 flex gap-6 font-mono text-sm">
        <a
          href={bio.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-(--color-signal) hover:underline"
        >
          GitHub
        </a>
        <a href={bio.links.email} className="text-(--color-signal) hover:underline">
          Email
        </a>
      </div>
    </section>
  );
}
