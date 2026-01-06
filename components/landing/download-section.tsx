"use client";

import { useState } from "react";
import { Smartphone, Apple, Monitor } from "lucide-react";
import Modal from "@/components/ui/modal";
import Link from "next/link";

export default function DownloadSection() {
  const [isIosModalOpen, setIsIosModalOpen] = useState(false);

  return (
    <>
      <section
        id="download"
        className="w-full mb-8 md:mb-12 card-glow p-6 rounded-3xl scroll-mt-10"
      >
      <h2 className="text-lg font-black mb-8 text-center md:text-2xl">
        دانلود اپلیکیشن Irans Pro
      </h2>
      <div className="grid grid-cols-3 gap-2 md:gap-4">
        {/* Android */}
        <div className="flex flex-col gap-2 group bg-white/[0.02] p-3 md:p-4 rounded-2xl border border-white/5 hover:bg-white/[0.05] transition-all">
          <div className="flex items-center flex-col gap-2 md:gap-3">
            <div className="p-1.5 md:p-2 bg-accent/10 rounded-lg text-accent shrink-0">
              <Smartphone size={18} className="md:w-6 md:h-6" />
            </div>
            <span className="text-[10px] font-bold text-gray-400 md:text-sm">
              Android
            </span>
          </div>
          <button className="w-full bg-accent text-black py-1.5 md:py-2 rounded-lg font-bold hover:bg-accent/90 transition-all text-[10px] cursor-pointer md:text-sm">
            دانلود
          </button>
        </div>

        {/* iOS */}
        <div className="flex flex-col gap-2 group bg-white/[0.02] p-3 md:p-4 rounded-2xl border border-white/5 hover:bg-white/[0.05] transition-all">
          <div className="flex items-center flex-col gap-2 md:gap-3">
            <div className="p-1.5 md:p-2 bg-accent/10 rounded-lg text-accent shrink-0">
              <Apple size={18} className="md:w-6 md:h-6" />
            </div>
            <span className="text-[10px] font-bold text-gray-400 md:text-sm">
              iOS
            </span>
          </div>
          <button
            onClick={() => setIsIosModalOpen(true)}
            className="w-full bg-accent text-black py-1.5 md:py-2 rounded-lg font-bold hover:bg-accent/90 transition-all text-[10px] cursor-pointer md:text-sm"
          >
            دانلود
          </button>
        </div>

        {/* Desktop */}
        <div className="flex flex-col gap-2 group bg-white/[0.02] p-3 md:p-4 rounded-2xl border border-white/5 hover:bg-white/[0.05] transition-all">
          <div className="flex items-center flex-col gap-2 md:gap-3">
            <div className="p-1.5 md:p-2 bg-accent/10 rounded-lg text-accent shrink-0">
              <Monitor size={18} className="md:w-6 md:h-6" />
            </div>
            <span className="text-[10px] font-bold text-gray-400 md:text-sm">
              Desktop
            </span>
          </div>
          <button className="w-full bg-accent text-black py-1.5 md:py-2 rounded-lg font-bold hover:bg-accent/90 transition-all text-[10px] cursor-pointer md:text-sm">
            دانلود
          </button>
        </div>
      </div>
      <p className="text-center text-gray-400 text-xs mt-8 font-medium md:text-xs">
        بدون ردیابی • بدون نیاز به ثبت نام • امن • متن‌باز
      </p>
    </section>

    <Modal
      isOpen={isIosModalOpen}
      onClose={() => setIsIosModalOpen(false)}
      title="نسخه iOS"
    >
      <div className="flex flex-col items-center gap-4 py-2">
          <div className="bg-accent/10 p-4 rounded-full text-accent shadow-[0_0_20px_rgba(74,222,128,0.1)]">
            <Apple size={40} />
          </div>
          <div className="text-center">
            <p className="text-2xl font-black text-white mb-2">بزودی...</p>
            <p className="text-gray-400 text-sm leading-relaxed">
              نسخه اختصاصی iOS ممکن است در آینده منتشر شود.
            </p>
          </div>

          <div className="w-full mt-4 p-4 bg-white/[0.03] border border-white/5 rounded-2xl">
            <p className="text-xs font-bold text-gray-400 mb-3 text-center">
              راهنمای اتصال و برنامه‌های پیشنهادی:
            </p>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2 p-3 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-all">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold">برنامه V2Box</span>
                  <a
                    href="https://apps.apple.com/us/app/v2box-v2ray-client/id6446814690"
                    target="_blank"
                    className="text-accent text-[10px] underline"
                  >
                    لینک اپ استور
                  </a>
                </div>
                <Link
                  href="/guide/v2box"
                  className="w-full bg-accent/10 text-accent py-2 rounded-lg text-xs font-bold text-center border border-accent/20"
                >
                  مشاهده آموزش قدم به قدم
                </Link>
              </div>

              <div className="flex flex-col gap-2 p-3 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-all">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold">برنامه Streisand</span>
                  <a
                    href="https://apps.apple.com/us/app/streisand/id6450534064"
                    target="_blank"
                    className="text-accent text-[10px] underline"
                  >
                    لینک اپ استور
                  </a>
                </div>
                <Link
                  href="/guide/streisand"
                  className="w-full bg-accent/10 text-accent py-2 rounded-lg text-xs font-bold text-center border border-accent/20"
                >
                  مشاهده آموزش قدم به قدم
                </Link>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsIosModalOpen(false)}
            className="w-full bg-accent text-black py-3 rounded-xl font-bold hover:bg-accent/90 transition-all cursor-pointer mt-2"
          >
            متوجه شدم
          </button>
        </div>
      </Modal>
    </>
  );
}
