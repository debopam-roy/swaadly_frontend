'use client';

export default function QuoteSection() {
  return (
    <section className="relative w-full bg-white py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
        <div className="space-y-8 md:space-y-12">
          {/* Main Quote Card */}
          <div className="bg-[#FF7E29] border-2 border-[#333] rounded-[40px] px-8 md:px-16 py-12 md:py-16">
            <div className="space-y-6 md:space-y-8">
              <h2 className="font-shrikhand italic text-white text-3xl md:text-5xl lg:text-[56px] leading-tight text-center">
                "Why has food become something we need to decode?"
              </h2>
              <p className="font-medium text-white/90 text-lg md:text-2xl leading-relaxed text-center max-w-4xl mx-auto">
                This simple question, asked between three friends, sparked the beginning of Swaadly.
              </p>
            </div>
          </div>

          {/* Three Problem Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Card 1 */}
            <div className="bg-[#FFE4B4] border-2 border-[#333] rounded-[32px] px-6 md:px-8 py-8 md:py-9 space-y-4">
              <div className="text-5xl md:text-6xl text-center">📝</div>
              <h3 className="font-bold text-[#333] text-xl md:text-2xl text-center">
                Labels were confusing
              </h3>
            </div>

            {/* Card 2 */}
            <div className="bg-[#44C997] border-2 border-[#333] rounded-[32px] px-6 md:px-8 py-8 md:py-9 space-y-4">
              <div className="text-5xl md:text-6xl text-center">🤔</div>
              <h3 className="font-bold text-[#333] text-xl md:text-2xl text-center">
                Ingredients felt unnecessary
              </h3>
            </div>

            {/* Card 3 */}
            <div className="bg-[#FFE4B4] border-2 border-[#333] rounded-[32px] px-6 md:px-8 py-8 md:py-9 space-y-4">
              <div className="text-5xl md:text-6xl text-center">📈</div>
              <h3 className="font-bold text-[#333] text-xl md:text-2xl text-center">
                Designed for trends
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
