"use client";

import { useState } from "react";
import { Smartphone, Apple, Monitor } from "lucide-react";
import Modal from "@/components/ui/modal";
import Link from "next/link";

export default function DownloadSection() {
  const [isIosModalOpen, setIsIosModalOpen] = useState(false);
  const [isAndroidModalOpen, setIsAndroidModalOpen] = useState(false);
  const [isDesktopModalOpen, setIsDesktopModalOpen] = useState(false);

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
          <button
            onClick={() => setIsAndroidModalOpen(true)}
            className="w-full bg-accent text-black py-1.5 md:py-2 rounded-lg font-bold hover:bg-accent/90 transition-all text-[10px] cursor-pointer md:text-sm"
          >
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
          <button
            onClick={() => setIsDesktopModalOpen(true)}
            className="w-full bg-accent text-black py-1.5 md:py-2 rounded-lg font-bold hover:bg-accent/90 transition-all text-[10px] cursor-pointer md:text-sm"
          >
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

      {/* Android Modal */}
      <Modal
        isOpen={isAndroidModalOpen}
        onClose={() => setIsAndroidModalOpen(false)}
        title="نسخه Android"
      >
        <div className="flex flex-col items-center gap-4 py-2">
          <div className="bg-[#3DDC84]/10 p-4 rounded-full text-[#3DDC84] shadow-[0_0_20px_rgba(61,220,132,0.1)]">
            <Smartphone size={40} />
          </div>
          <div className="text-center">
            <p className="text-2xl font-black text-white mb-2">v2rayNG</p>
            <p className="text-gray-400 text-sm leading-relaxed">
              برنامه پیشنهادی برای گوشی‌های اندروید
            </p>
          </div>

          <div className="w-full mt-4 p-4 bg-white/[0.03] border border-white/5 rounded-2xl">
            <p className="text-xs font-bold text-gray-400 mb-3 text-center">
              لینک‌های دانلود:
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="https://en.v2rayng.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-center items-center gap-2 p-3 bg-[#3DDC84] text-black rounded-xl font-bold text-sm hover:bg-[#3DDC84]/90 transition-all"
              >
                سایت رسمی v2rayNG
              </a>
              <a
                href="https://github.com/2dust/v2rayNG/releases"
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-center items-center gap-2 p-3 bg-white/10 text-white rounded-xl font-bold text-sm hover:bg-white/20 transition-all border border-white/10"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                دانلود از GitHub (اگر فیلتر بود)
              </a>
            </div>
            
            <div className="mt-4 pt-4 border-t border-white/10">
              <Link
                href="/guide/v2rayng"
                className="w-full flex justify-center bg-accent/10 text-accent py-3 rounded-xl text-sm font-bold text-center border border-accent/20 hover:bg-accent/20 transition-all"
              >
                مشاهده آموزش قدم به قدم
              </Link>
            </div>
          </div>

          <button
            onClick={() => setIsAndroidModalOpen(false)}
            className="w-full bg-accent text-black py-3 rounded-xl font-bold hover:bg-accent/90 transition-all cursor-pointer mt-2"
          >
            متوجه شدم
          </button>
        </div>
      </Modal>

      {/* Desktop Modal */}
      <Modal
        isOpen={isDesktopModalOpen}
        onClose={() => setIsDesktopModalOpen(false)}
        title="نسخه Desktop"
      >
        <div className="flex flex-col items-center gap-4 py-2">
          <div className="bg-[#6366f1]/10 p-4 rounded-full text-[#6366f1] shadow-[0_0_20px_rgba(99,102,241,0.1)]">
            <Monitor size={40} />
          </div>
          <div className="text-center">
            <p className="text-2xl font-black text-white mb-2">v2rayN</p>
            <p className="text-gray-400 text-sm leading-relaxed">
              برنامه کراس‌پلتفرم برای ویندوز، مک و لینوکس
            </p>
          </div>

          <div className="w-full mt-4 p-4 bg-white/[0.03] border border-white/5 rounded-2xl">
            <p className="text-xs font-bold text-gray-400 mb-3 text-center">
              لینک‌های دانلود:
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="https://en.v2rayn.org/download/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-center items-center gap-2 p-3 bg-[#6366f1] text-white rounded-xl font-bold text-sm hover:bg-[#6366f1]/90 transition-all"
              >
                سایت رسمی v2rayN
              </a>
              <a
                href="https://github.com/2dust/v2rayN/releases"
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-center items-center gap-2 p-3 bg-white/10 text-white rounded-xl font-bold text-sm hover:bg-white/20 transition-all border border-white/10"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                دانلود از GitHub (اگر فیلتر بود)
              </a>
            </div>
            
            <div className="mt-4 pt-4 border-t border-white/10">
              <Link
                href="/guide/v2rayn"
                className="w-full flex justify-center bg-accent/10 text-accent py-3 rounded-xl text-sm font-bold text-center border border-accent/20 hover:bg-accent/20 transition-all"
              >
                مشاهده آموزش قدم به قدم
              </Link>
            </div>
          </div>

          <button
            onClick={() => setIsDesktopModalOpen(false)}
            className="w-full bg-accent text-black py-3 rounded-xl font-bold hover:bg-accent/90 transition-all cursor-pointer mt-2"
          >
            متوجه شدم
          </button>
        </div>
      </Modal>
    </>
  );
}
