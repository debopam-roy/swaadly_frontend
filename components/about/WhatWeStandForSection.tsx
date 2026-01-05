'use client';

export default function WhatWeStandForSection() {
  const values = [
    {
      emoji: '🥜',
      title: 'Clean ingredients',
      description: 'No compromises, no shortcuts',
      bgColor: 'bg-[#FF7E29]',
    },
    {
      emoji: '✓',
      title: 'Honest labels',
      description: "You deserve to know what's inside",
      bgColor: 'bg-[#44C997]',
    },
    {
      emoji: '❤️',
      title: 'Real swaad',
      description: 'Taste that makes you smile',
      bgColor: 'bg-[#FFE4B4]',
    },
  ];

  return (
    <section className="relative w-full bg-[#FFF8F0] py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
        <div className="space-y-8 md:space-y-16">
          {/* Heading */}
          <h2 className="font-shrikhand text-4xl md:text-5xl lg:text-6xl text-center">
            What we stand for
          </h2>

          {/* Values Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-white border-[1] border-black rounded-[40px] shadow-[8px_8px_0px_0px_#333] px-6 md:px-10 py-8 md:py-10 space-y-4 md:space-y-5"
              >
                {/* Emoji Circle */}
                <div className="flex justify-center">
                  <div className={`${value.bgColor} border-[1] border-black rounded-full w-20 h-20 flex items-center justify-center`}>
                    <span className="text-4xl md:text-5xl">{value.emoji}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-bold text-2xl md:text-[28px] text-center">
                  {value.title}
                </h3>

                {/* Description */}
                <p className="font-medium text-lg md:text-xl text-center">
                  {value.description}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom Message Card */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-black rounded-[40px] px-6 md:px-16 py-10 md:py-16 space-y-6">
              <h3 className="font-bold text-white text-3xl md:text-4xl text-center">
                Food should feel simple again
              </h3>

              {/* Divider */}
              <div className="flex justify-center">
                <div className="bg-[#44C997] h-1 w-24 rounded-full" />
              </div>

              <p className="font-medium text-white text-xl md:text-2xl text-center">
                and that's the journey Swaadly is built on.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
