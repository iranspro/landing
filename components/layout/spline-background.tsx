"use client";

export default function SplineBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      <div className="absolute inset-0 bg-[#0a0f1a]" />
      <div className="absolute inset-0 bg-[#0a0f1a]/90" />
    </div>
  );
}
