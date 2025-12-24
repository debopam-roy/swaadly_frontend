'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function FromPeanutSection() {
  return (
    <section className="flex w-full">
      {/* Left Side - Green Background with Text */}
      <div className="flex-1 bg-[#44c997] px-[60px] py-20 flex flex-col gap-8 justify-center">
        <div className="flex flex-col gap-6">
          <h2 className="font-extralight text-[80px] leading-[84px] font-display">
            From peanut to jar
          </h2>
          <p className="font-medium text-[#333] text-[32px] leading-9">
            Premium peanuts, slow roasting, stone grinding - all crafted with care for you
          </p>
        </div>

        {/* Learn More Button */}
        <Link
          href="/about"
          className="border-2 border-[#333] rounded-[100px] h-[72px] px-6 pr-4 flex items-center justify-center gap-2 hover:bg-[rgba(0,0,0,0.05)] transition-colors w-fit"
        >
          <span className="font-medium text-[#333] text-[24px] leading-7">
            Learn more
          </span>
          <Image
            src="/images/right_arrow.svg"
            alt=""
            width={40}
            height={40}
          />
        </Link>
      </div>

      {/* Right Side - Image */}
      <div className="flex-1 bg-[#ffe4b4] relative aspect-[734/800]">
        <Image
          src="/images/best_way_to_eat.svg"
          alt="Peanut butter sandwich"
          fill
          className="object-cover object-center"
        />
      </div>
    </section>
  );
}
