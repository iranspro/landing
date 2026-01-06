"use client";

import { Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
});

export default function SplineBackground() {
  const [mount, setMount] = useState(false);

  useEffect(() => {
    if ("requestIdleCallback" in window) {
      requestIdleCallback(() => setMount(true));
    } else {
      setTimeout(() => setMount(true), 2000);
    }
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      <Suspense fallback={<div className="bg-[#0a0f1a] w-full h-full" />}>
        {mount && (
          <Spline scene="https://prod.spline.design/3JH1YJX1bXoX4YpS/scene.splinecode" />
        )}
      </Suspense>
      <div className="absolute inset-0 bg-[#0a0f1a]/90" />
    </div>
  );
}
