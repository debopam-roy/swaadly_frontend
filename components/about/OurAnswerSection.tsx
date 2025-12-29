'use client';

import Image from 'next/image';

export default function OurAnswerSection() {
  return (
    <section className="relative w-full bg-[#FFF8F0] py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Image */}
          <div className="relative order-2 lg:order-1">
            {/* Rotated Background */}
            <div className="absolute inset-0 rotate-3 bg-[#FFE4B4] rounded-[40px] -z-10 scale-105" />

            {/* Image Container */}
            <div className="absolute left-0 -top-7 -right-6 -bottom-1 bg-background rounded-[40px] -bg-conic-120 -rotate-3" />
            <div className="relative border-2 border-[#333] rounded-[40px] overflow-hidden">
              <Image
                src="/images/hero.png"
                alt="Swaadly peanut butter jars"
                width={628}
                height={504}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-6 md:space-y-8 order-1 lg:order-2">
            {/* Heading */}
            <h2 className="font-shrikhand italic text-4xl md:text-5xl lg:text-6xl leading-tight">
              Our answer? Simple.
            </h2>

            {/* Description */}
            <p className="font-medium text-xl md:text-2xl leading-relaxed">
              Create food that feels{' '}
              <span className="relative inline-block">honest</span>, <span className="relative inline-block">clean</span>, and full of{' '}
              <span className="relative inline-block">swaad</span>.
            </p>

            {/* Feature Card */}
            <div className="bg-white border-2 border-[#333] rounded-[32px] px-6 md:px-8 py-6 md:py-9 space-y-5">
              <h3 className="font-bold text-lg md:text-xl">
                Every Swaadly jar starts with:
              </h3>

              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="bg-[#44C997] rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0">
                    <span className="font-medium">✓</span>
                  </div>
                  <span className="font-medium text-lg md:text-xl">Real roasted peanuts</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-[#44C997] rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0">
                    <span className="font-medium">✓</span>
                  </div>
                  <span className="font-medium text-lg md:text-xl">No palm oil</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-[#44C997] rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0">
                    <span className="font-medium">✓</span>
                  </div>
                  <span className="font-medium text-lg md:text-xl">No preservatives</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-[#44C997] rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0">
                    <span className="font-medium">✓</span>
                  </div>
                  <span className="font-medium text-lg md:text-xl">No complicated claims</span>
                </li>
              </ul>
            </div>

            <p className="font-medium text-[#020202] text-lg md:text-xl text-center">
              Just ingredients that make sense.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
