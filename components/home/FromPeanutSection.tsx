import Image from 'next/image';
import Link from 'next/link';

export default function FromPeanutSection() {
  return (
    <section className="flex flex-col lg:flex-row w-full">
      {/* Left Side - Green Background with Text */}
      <div className="flex-1 bg-[#44c997] px-4 sm:px-8 md:px-12 lg:px-[60px] py-8 sm:py-12 md:py-16 lg:py-20 flex flex-col gap-4 sm:gap-6 md:gap-8 justify-center">
        <div className="flex flex-col gap-3 sm:gap-4 md:gap-6">
          <h2 className="font-extralight text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[80px] leading-tight lg:leading-[84px] font-display">
            From peanut to jar
          </h2>
          <p className="font-medium text-base sm:text-lg md:text-xl lg:text-2xl xl:text-[32px] leading-relaxed lg:leading-9">
            Premium peanuts, slow roasting, stone grinding - all crafted with care for you
          </p>
        </div>

        {/* Learn More Button */}
        <Link
          href="/about"
          className="border-2 border-[#333] rounded-[100px] h-12 sm:h-14 md:h-16 lg:h-[72px] px-4 sm:px-5 md:px-6 pr-3 sm:pr-4 flex items-center justify-center gap-2 hover:bg-[rgba(0,0,0,0.05)] transition-colors w-fit"
        >
          <span className="font-medium text-sm sm:text-base md:text-lg lg:text-xl xl:text-[24px] leading-7">
            Learn more
          </span>
          <Image
            src="/images/right_arrow.svg"
            alt=""
            width={32}
            height={32}
            className="sm:w-9 sm:h-9 lg:w-10 lg:h-10"
          />
        </Link>
      </div>

      {/* Right Side - Image */}
      <div className="flex-1 bg-[#ffe4b4] relative min-h-[300px] sm:min-h-[400px] lg:min-h-0 lg:aspect-734/800">
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
