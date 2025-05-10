'use client';

import Link from 'next/link';
import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full px-6 py-4 flex justify-between items-center bg-[#ffffffcc] text-black">
      <Link href="/" className="text-black">
        <Image src="/Mylogosvg.svg" alt="Scrapt Logo" width={40} height={40} />
      </Link>
      <nav className="space-x-4">
        <Link href="/" className="hover:text-[#ff005c]">Home</Link>
        <Link href="/#about" className="hover:text-[#ff005c]">About Me</Link>
      </nav>
    </header>
  );
}
