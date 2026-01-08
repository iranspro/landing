"use client";

import { useState } from "react";
import { Lock } from "lucide-react";

export default function EmailSubscription() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    try {
      const response = await fetch("/api/subscription/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message || "لینک سابسکریپشن به ایمیل شما ارسال شد");
        setEmail("");
        setTimeout(() => {
          setStatus("idle");
          setMessage("");
        }, 5000);
      } else {
        setStatus("error");
        setMessage(data.error || "خطا در ایجاد سابسکریپشن");
        setTimeout(() => {
          setStatus("idle");
          setMessage("");
        }, 5000);
      }
    } catch (error) {
      setStatus("error");
      setMessage("خطا در برقراری ارتباط با سرور");
      setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 5000);
    }
  };

  return (
    <section
      id="email-section"
      className="w-full mb-8 md:mb-12 card-glow p-6 rounded-3xl scroll-mt-10"
    >
      <div className="flex flex-col items-center mb-4 md:mb-6">
        <div className="p-2 bg-accent/10 rounded-lg mb-3 md:mb-4">
          <Lock size={20} className="text-accent md:w-6 md:h-6" />
        </div>
        <h2 className="text-base font-black md:text-xl">Email Subscription</h2>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 bg-white/[0.02] border border-white/10 rounded-xl p-1.5 md:p-3 md:max-w-xl md:mx-auto"
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          dir="rtl"
          placeholder="ایمیل خود را برای دریافت آپدیت‌ها وارد کنید"
          className="flex-1 bg-transparent border-none text-right focus:outline-none text-xs text-gray-300 px-2 md:text-base"
        />
        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className="bg-accent text-black px-4 py-2 rounded-lg font-bold hover:bg-accent/90 transition-all text-xs disabled:opacity-50 cursor-pointer min-w-[80px] md:text-sm md:px-6 md:py-3"
        >
          {status === "loading"
            ? "..."
            : status === "success"
            ? "ثبت شد"
            : "آگاه‌سازی"}
        </button>
      </form>
      {message && (
        <p
          className={`mt-3 text-center text-sm md:text-base ${
            status === "success" ? "text-accent" : "text-red-400"
          }`}
        >
          {message}
        </p>
      )}
    </section>
  );
}
