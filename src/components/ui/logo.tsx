'use client';

import Link from 'next/link';
import Image from 'next/image';

export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link href="/" className={`group flex items-center ${className}`}>
      <div className="relative flex h-10 w-auto items-center justify-center sm:h-11">
        <Image
          src="/nebulax.png"
          alt="NebulaX Logo"
          width={110}
          height={44}
          className="h-full w-auto object-contain"
          priority
          unoptimized
        />
      </div>
    </Link>
  );
}
