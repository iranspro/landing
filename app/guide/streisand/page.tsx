"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ArrowLeft, Info } from "lucide-react";

// Importing images from assets
import logo from "@/assets/streisand/logo.svg";
import step1 from "@/assets/streisand/step-1.jpg";
import step2 from "@/assets/streisand/step-2.jpg";
import step3 from "@/assets/streisand/step-3.jpg";

export default function StreisandGuide() {
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
        <h1 className="text-xl md:text-2xl font-black">
          راهنمای اتصال Streisand
        </h1>
      </div>

      <section className="mb-10 card-glow p-6 rounded-3xl">
        <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
          <div className="bg-accent/10 p-4 rounded-3xl text-accent">
            <Image
              src={logo}
              alt="Streisand Logo"
              width={60}
              height={60}
              className="rounded-2xl"
            />
          </div>
          <div className="text-center md:text-right flex-1">
            <h2 className="text-lg font-bold mb-2">
              دریافت اپلیکیشن Streisand
            </h2>
            <p className="text-gray-400 text-sm mb-4">
              برای شروع، ابتدا برنامه را از اپ استور دانلود کنید.
            </p>
            <a
              href="https://apps.apple.com/us/app/streisand/id6450534064"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="Download Streisand on the App Store"
                style={{ height: "40px" }}
              />
            </a>
          </div>
        </div>

        <div className="space-y-12">
          {/* Step 1 */}
          <div className="relative">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-accent text-black w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">
                ۱
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">
                  ثبت ایمیل و دریافت کانفیگ
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  ابتدا باید ایمیل خود را در صفحه اصلی سایت ثبت کنید. پس از
                  ثبت‌نام، لینک یا متن کانفیگ برای شما ارسال خواهد شد.
                </p>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex gap-3 items-start">
              <Info size={18} className="text-accent shrink-0 mt-0.5" />
              <div className="text-xs text-gray-400 space-y-1">
                <p>• ایمیل را دقیق و صحیح وارد کنید.</p>
                <p>• پوشه اسپم (Spam) ایمیل خود را حتماً بررسی کنید.</p>
                <p>• بدون داشتن کانفیگ، امکان اتصال وجود ندارد.</p>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-accent text-black w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">
                ۲
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">کپی کردن متن کانفیگ</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  پس از دریافت ایمیل، متن کانفیگ را به طور کامل انتخاب و کپی
                  کنید. دقت کنید که هیچ کاراکتری (حتی یک فاصله اضافه) کم یا زیاد
                  نشود.
                </p>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-accent text-black w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">
                ۳
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">
                  ورود به برنامه Streisand
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  برنامه را در آیفون خود باز کنید. در ابتدا وضعیت روی{" "}
                  <span className="text-white font-mono uppercase text-xs px-2 py-0.5 bg-red-500/10 rounded border border-red-500/20 text-red-400">
                    Disconnected
                  </span>{" "}
                  قرار دارد.
                </p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-xl max-w-sm mx-auto">
              <Image
                src={step1}
                alt="Streisand Step 1"
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Step 4 */}
          <div className="relative">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-accent text-black w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">
                ۴
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">
                  افزودن کانفیگ به برنامه
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  روی علامت <span className="text-accent">+</span> در گوشه بالا
                  سمت راست بزنید. سپس از منوی باز شده گزینه زیر را انتخاب کنید:
                </p>
                <div className="bg-accent/10 text-accent font-bold py-2 px-4 rounded-xl border border-accent/20 inline-block text-sm">
                  Import from Clipboard
                </div>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-xl max-w-sm mx-auto">
              <Image
                src={step2}
                alt="Streisand Step 2"
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Step 5 */}
          <div className="relative">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-accent text-black w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">
                ۵
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">
                  انتخاب پروفایل و اتصال
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  پس از اضافه شدن، پروفایل جدید در لیست نمایان می‌شود. روی دکمه
                  بزرگ دایره‌ای در وسط صفحه کلیک کنید تا وضعیت به{" "}
                  <span className="text-green-400">Connected</span> تغییر کند.
                </p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-xl max-w-sm mx-auto">
              <Image
                src={step3}
                alt="Streisand Step 3"
                className="w-full h-auto"
              />
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
