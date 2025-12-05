'use client';

import { MessageCircle } from 'lucide-react';
import Link from 'next/link';

export function WhatsAppButton() {
  return (
    <Link
      href="https://wa.me/9779709098343"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-xl shadow-blue-500/30 transition-all duration-200 hover:scale-110 hover:bg-blue-500 hover:shadow-2xl hover:shadow-blue-500/40"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </Link>
  );
}
