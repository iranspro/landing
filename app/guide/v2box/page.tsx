"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ArrowLeft } from "lucide-react";

// Importing images from assets
import logo from "@/assets/v2box/logo.png";
import step1 from "@/assets/v2box/step-1.jpg";
import step2 from "@/assets/v2box/step-2.jpg";
import step3 from "@/assets/v2box/step-3.jpg";

export default function V2BoxGuide() {
  return (
    <div className="w-full">
      <div className="mb-8 flex items-center justify-between">
        <Link
          href="/guide"
          className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors text-sm"
        >
          <ChevronRight size={20} />
          بازگشت به راهنما
        </Link>
        <h1 className="text-xl md:text-2xl font-black">راهنمای اتصال V2Box</h1>
      </div>

      <section className="mb-10 card-glow p-6 rounded-3xl">
        <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
          <div className="bg-[#1c7ed6]/10 p-4 rounded-3xl text-[#1c7ed6]">
            <Image
              src={logo}
              alt="V2Box Logo"
              width={60}
              height={60}
              className="rounded-2xl"
            />
          </div>
          <div className="text-center md:text-right flex-1">
            <h2 className="text-lg font-bold mb-2">دریافت اپلیکیشن V2Box</h2>
            <p className="text-gray-400 text-sm mb-4">
              برنامه V2Box را از اپ استور دریافت کنید.
            </p>
            <a
              href="https://apps.apple.com/us/app/v2box-v2ray-client/id6446814690"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="Download V2Box on the App Store"
                style={{ height: "40px" }}
              />
            </a>
          </div>
        </div>

        <div className="space-y-12">
          {/* Step 1 */}
          <div className="relative">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-accent text-black w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">
                ۱
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">
                  ورود به بخش کانفیگ‌ها
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  برنامه را باز کرده و از منوی پایین صفحه، وارد زبانه{" "}
                  <span className="text-white font-bold">Configs</span> شوید.
                </p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-xl max-w-sm mx-auto">
              <Image src={step1} alt="V2Box Step 1" className="w-full h-auto" />
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-accent text-black w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">
                ۲
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">افزودن کانفیگ جدید</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  روی علامت <span className="text-accent">+</span> در بالای صفحه
                  کلیک کنید و گزینه اول را انتخاب کنید تا لینک یا کانفیگ کپی شده
                  در کلیپ‌بورد، به برنامه اضافه شود.
                </p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-xl max-w-sm mx-auto">
              <Image src={step2} alt="V2Box Step 2" className="w-full h-auto" />
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-accent text-black w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">
                ۳
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">اتصال نهایی</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  پس از اضافه شدن کانفیگ به لیست، به صفحه اصلی برنامه (Home)
                  برگشته و دکمه اسلایدر{" "}
                  <span className="text-white font-bold italic">
                    Slide to Connect
                  </span>{" "}
                  را به سمت راست بکشید.
                </p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-xl max-w-sm mx-auto">
              <Image src={step3} alt="V2Box Step 3" className="w-full h-auto" />
            </div>
            <div className="mt-6 bg-green-500/10 border border-green-500/20 rounded-2xl p-4 flex gap-3 items-center">
              <div className="bg-green-500 w-2 h-2 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
              <p className="text-xs text-green-400 font-bold">
                وقتی دکمه فعال شد، وی‌پی‌ان شما با موفقیت وصل شده است.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="text-center pb-8">
        <Link
          href="/guide"
          className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl font-bold hover:bg-white/10 transition-all text-sm"
        >
          <ArrowLeft size={18} />
          بازگشت به مرکز راهنما
        </Link>
      </footer>
    </div>
  );
}
