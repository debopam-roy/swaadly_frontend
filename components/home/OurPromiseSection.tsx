'use client';

import Image from 'next/image';

export default function OurPromiseSection() {
  const promises = [
    {
      text: (
        <>
          Affordable yet <span className="text-[#28a777]">premium</span>
        </>
      ),
    },
    {
      text: (
        <>
          <span className="text-[#28a777]">No</span> BS ingredients
        </>
      ),
    },
    {
      text: (
        <>
          <span className="text-[#28a777]">Honest</span> label,{' '}
          <span className="text-[#28a777]">honest</span> food
        </>
      ),
    },
    {
      text: (
        <>
          Healthy taste for <span className="text-[#28a777]">everyone</span>{' '}
          (not just gym freaks)
        </>
      ),
    },
  ];

  return (
    <section className="relative flex overflow-hidden">
      {/* Left Side - Image */}
      <div className="relative w-[410px] h-[800px] shrink-0">
        <Image
          src="/images/promise.svg"
          alt="Our Promise"
          fill
          className="object-cover"
        />

        {/* Gradient Overlays */}
        <div className="absolute top-0 left-0 right-0 h-[357px] bg-gradient-to-b from-white to-transparent backdrop-blur-[0.5px]" />
        <div className="absolute bottom-0 left-0 right-0 h-[177px] bg-gradient-to-t from-white to-transparent backdrop-blur-[0.5px]" />
        <div
          className="absolute top-0 right-0 bottom-0 w-[253px]"
          style={{
            background: 'linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgb(255, 255, 255) 100%)',
          }}
        />
      </div>

      {/* Right Side - Content */}
      <div className="flex-1 bg-white px-[60px] py-[120px] flex items-center">
        <div className="flex flex-col gap-10 w-full">
          <h2 className="font-bold text-[#28a777] text-[100px] leading-[104px]">
            Our Promise
          </h2>

          <ul className="flex flex-col gap-8 text-[40px] leading-[44px] font-medium text-[rgba(51,51,51,0.8)]">
            {promises.map((promise, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-4">•</span>
                <span>{promise.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
