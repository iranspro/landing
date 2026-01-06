import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full text-center py-8 md:py-16">
      <p className="text-white text-lg font-medium mb-4 md:mb-6">Irans Pro ©</p>
      <div className="flex justify-center gap-4 text-xs md:text-sm text-gray-300 mb-6 md:mb-8">
        <Link
          href="https://github.com/iranspro"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-accent transition-colors cursor-pointer"
        >
          گیت‌هاب
        </Link>
        <span>•</span>
        <Link
          href="#"
          className="hover:text-accent transition-colors cursor-pointer"
        >
          مستندات
        </Link>
        <span>•</span>
        <Link
          href="#"
          className="hover:text-accent transition-colors cursor-pointer"
        >
          امنیت
        </Link>
      </div>
      <p className="text-xs md:text-sm lg:text-base text-gray-300 font-semibold">
        توسعه‌یافته توسط{" "}
        <Link
          href="https://t.me/POUYAM_APPBOT/start"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          Pouyam World
        </Link>{" "}
        برای آزادی دیجیتال
      </p>
    </footer>
  );
}
