"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEsc);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">
      <div 
        className="relative w-full max-w-md bg-zinc-900 border border-white/10 rounded-3xl p-6 shadow-2xl transition-all duration-300 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">
            {title}
          </h3>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>
        <div className="text-gray-300">
          {children}
        </div>
      </div>
      <div 
        className="absolute inset-0 -z-10" 
        onClick={onClose}
      />
    </div>
  );
}
