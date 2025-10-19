"use client";

import { LavaLamp } from "@/components/ui/fluid-blob";

export default function Demo() {
  return (
    <div className="relative flex min-h-screen w-screen flex-col items-center justify-center overflow-hidden bg-black">
      <LavaLamp />
      <div className="relative z-10 flex max-w-2xl flex-col items-center gap-6 px-6 text-center text-white mix-blend-exclusion">
        <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
          Morphic Dreams
        </h1>
        <p className="text-lg leading-relaxed md:text-xl">
          Where thoughts take shape and consciousness flows like liquid mercury
          through infinite dimensions.
        </p>
      </div>
    </div>
  );
}
