"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Mail, HelpCircle, ArrowLeft, ExternalLink } from "lucide-react";

// Importing logos from assets
import streisandLogo from "@/assets/streisand/logo.svg";
import v2boxLogo from "@/assets/v2box/logo.png";

export default function GuidePage() {
  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors text-sm"
        >
          <ChevronRight size={20} />
          بازگشت به خانه
        </Link>
        <h1 className="text-2xl md:text-3xl font-black">مرکز راهنما</h1>
      </div>

      {/* Step 1: How to get config */}
      <section className="mb-12 card-glow p-8 rounded-3xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-accent/10 p-3 rounded-2xl text-accent">
            <Mail size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold">چطور کانفیگ دریافت کنم؟</h2>
            <p className="text-gray-400 text-sm">
              برای دریافت آخرین کانفیگ‌ها، باید ایمیل خود را در صفحه اصلی ثبت کنید.
            </p>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
          <ol className="space-y-4 text-right" dir="rtl">
            <li className="flex gap-3 items-start">
              <span className="bg-accent text-black w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-1">۱</span>
              <p className="text-gray-300 text-sm leading-relaxed">به بخش ثبت ایمیل در صفحه اصلی مراجعه کنید.</p>
            </li>
            <li className="flex gap-3 items-start">
              <span className="bg-accent text-black w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-1">۲</span>
              <p className="text-gray-300 text-sm leading-relaxed">ایمیل فعال خود را وارد کرده و دکمه تایید را بزنید.</p>
            </li>
            <li className="flex gap-3 items-start">
              <span className="bg-accent text-black w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-1">۳</span>
              <p className="text-gray-300 text-sm leading-relaxed">صندوق ورودی (Inbox) و پوشه Spam خود را بررسی کنید.</p>
            </li>
          </ol>
        </div>

        <div className="flex">
          <Link
            href="/#email-section"
            className="group flex w-full text-center justify-center sm:w-auto items-center gap-2 bg-accent text-black px-4 py-3 rounded-2xl text-sm font-semibold hover:bg-accent/90 transition-all btn-glow"
          >
            <ExternalLink size={20} />
            رفتن به بخش ثبت ایمیل
          </Link>
        </div>
      </section>

      {/* Other Guides */}
      <section>
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-accent/10 p-3 rounded-2xl text-accent">
            <HelpCircle size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold">راهنمای استفاده از اپلیکیشن‌ها</h2>
            <p className="text-gray-400 text-sm">آموزش گام‌به‌گام اتصال در پلتفرم‌های مختلف</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* V2Box Guide Card */}
          <Link 
            href="/guide/v2box"
            className="group card-glow p-6 rounded-3xl hover:bg-white/[0.03] transition-all border border-white/5 hover:border-accent/20"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-white/5 p-3 rounded-2xl group-hover:bg-accent/10 transition-colors">
                <Image src={v2boxLogo} alt="V2Box" width={48} height={48} className="rounded-xl" />
              </div>
              <div>
                <h3 className="text-lg font-bold">V2Box (iOS)</h3>
                <p className="text-gray-400 text-xs">مناسب برای آیفون و آیپد</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-accent text-sm font-bold">
              مشاهده آموزش
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Streisand Guide Card */}
          <Link 
            href="/guide/streisand"
            className="group card-glow p-6 rounded-3xl hover:bg-white/[0.03] transition-all border border-white/5 hover:border-accent/20"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-white/5 p-3 rounded-2xl group-hover:bg-accent/10 transition-colors">
                <Image src={streisandLogo} alt="Streisand" width={48} height={48} className="rounded-xl" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Streisand (iOS)</h3>
                <p className="text-gray-400 text-xs">نرم‌افزار قدرتمند و سریع</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-accent text-sm font-bold">
              مشاهده آموزش
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>
    </>
  );
}
