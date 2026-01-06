"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
});

export default function SplineBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      <Suspense fallback={<div className="bg-[#0a0f1a] w-full h-full" />}>
        <Spline scene="https://prod.spline.design/DmoWFKEKpfDgzqay/scene.splinecode" />
      </Suspense>
      <div className="absolute inset-0 bg-[#0a0f1a]/90" />
    </div>
  );
}
