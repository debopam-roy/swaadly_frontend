'use client';

export default function VisionSection() {
  return (
    <section className="relative w-full bg-[#44C997] overflow-hidden py-12 md:py-24">
      {/* Decorative Peanut Icons */}
      <div className="absolute top-10 right-0 opacity-10 pointer-events-none">
        <div className="text-[300px]">🥜</div>
      </div>
      <div className="absolute top-2 -left-64 opacity-10 pointer-events-none rotate-180">
        <div className="text-[300px]">🥜</div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
        <div className="space-y-8 md:space-y-12">
          {/* Heading */}
          <h2 className="font-shrikhand italic text-4xl md:text-5xl lg:text-6xl text-center">
            Our Vision
          </h2>

          {/* Vision Card */}
          <div className="max-w-5xl mx-auto">
            <div className="bg-white border-[1] border-black rounded-[40px] px-6 md:px-16 py-10 md:py-16 space-y-6 md:space-y-8">
              <p className="font-bold text-2xl md:text-3xl leading-relaxed text-center">
                A future where families, students and fitness enthusiasts all enjoy food that is simple, nutritious and full of swaad.
              </p>

              {/* Divider */}
              <div className="flex justify-center">
                <div className="bg-[#FF7E29] h-1 w-24 rounded-full" />
              </div>

              <p className="font-medium text-xl md:text-2xl leading-relaxed text-center">
                A world where "healthy" tastes like something you actually look forward to eating.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
