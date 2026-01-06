import { Github } from "lucide-react";
import Image from "next/image";
import DownloadSection from "@/components/landing/download-section";
import EmailSubscription from "@/components/landing/email-subscription";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section
        id="hero"
        className="flex flex-col items-center text-center mb-10 md:mb-16 scroll-mt-10"
      >
        <div className="mb-4 md:mb-6 text-accent hidden md:block">
          <Image
            src="/logo.png"
            alt="Irans Pro Logo"
            width={200}
            height={200}
            className="size-32 opacity-90 drop-shadow-[0_0_15px_rgba(74,222,128,0.4)]"
          />
        </div>
        <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight tracking-tight bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
          اینترنت آزاد، متن‌باز برای ایران
        </h1>
        <p className="text-gray-400 text-sm md:text-base mb-6 md:mb-10 font-medium max-w-lg leading-relaxed">
          ابزارهای دسترسی آزاد برای مبارزه با سانسور اینترنت
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="#email-section"
            className="bg-accent text-black px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-accent/90 transition-all btn-glow text-sm cursor-pointer"
          >
            دریافت کانفیگ‌ VPN
          </a>
          <a
            href="https://github.com/iranspro"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-accent/40 bg-accent/5 backdrop-blur-md px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-accent/10 transition-all text-sm cursor-pointer text-accent"
          >
            <Github size={18} />
            گیت هاب
          </a>
        </div>
      </section>

      {/* Download Section - Grid Layout */}
      <DownloadSection />

      {/* Email Subscription - Single Card like image */}
      <EmailSubscription />

      {/* Open Source Transparency - Single Card like image */}
      <section
        id="open-source"
        className="w-full mb-8 md:mb-12 card-glow p-6 rounded-3xl text-center scroll-mt-10"
      >
        <div className="flex items-center justify-center gap-2 mb-3 md:mb-4">
          <h2 className="text-sm font-black md:text-lg">
            ۱۰۰٪ متن‌باز — بدون پروژه مخفی
          </h2>
          <Github size={18} className="text-accent md:w-6 md:h-6" />
        </div>
        <a
          href="https://github.com/iranspro"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-white/5 text-gray-300 py-2.5 rounded-xl font-bold hover:bg-white/10 transition-all border border-white/10 text-xs cursor-pointer md:text-sm md:max-w-xs md:mx-auto block"
        >
          بررسی کد منبع
        </a>
      </section>
    </>
  );
}
