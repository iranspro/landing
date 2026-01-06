import Link from "next/link";
import Image from "next/image";
import { HelpCircle } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full flex justify-between items-center mb-8 md:mb-12">
      <Link
        href="/guide"
        className="text-gray-400 hover:text-white transition-colors font-medium flex items-center gap-2 text-sm md:text-base border border-white/5 bg-white/[0.02] px-4 py-1.5 rounded-xl hover:bg-white/[0.05]"
      >
        <HelpCircle size={16} className="text-accent" />
        راهنما
      </Link>
      <Link href="/" className="flex items-center gap-2 group">
        <span className="text-xl font-bold tracking-tight text-white group-hover:text-accent transition-colors">
          Irans Pro
        </span>
        <div className="text-accent">
          <Image
            src="/logo.png"
            alt="Irans Pro Logo"
            width={48}
            height={48}
            className="w-12 h-12 opacity-90 drop-shadow-[0_0_10px_rgba(74,222,128,0.5)] group-hover:scale-105 transition-transform"
          />
        </div>
      </Link>
    </header>
  );
}
