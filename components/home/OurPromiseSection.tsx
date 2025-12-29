import Image from 'next/image';

export default function OurPromiseSection() {
  const promises = [
    {
      text: (
        <>
          <span className="text-primary_button">Authentic</span> roasted peanut taste
        </>
      ),
    },
    {
      text: (
        <>
          Clean Label, <span className="text-[#28a777]">Full Flavour</span>
        </>
      ),
    },
    {
      text: (
        <>
          Only <span className="text-[#28a777]">ingredients</span> that matters
        </>
      ),
    },
    {
      text: (
        <>
          Healthy taste for <span className="text-[#28a777]">everyone</span>
        </>
      ),
    },
  ];

  return (
    <section className="relative flex overflow-hidden">
      {/* Left Side - Image */}
      <div className="relative w-2/5 md:w-[300px] lg:w-[350px] xl:w-[410px] h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[800px] shrink-0">
        <Image
          src="https://storage.googleapis.com/swaadly-uploads-prod/promise.png"
          alt="Our Promise"
          fill
          className="object-cover bg-white"
        />

        {/* Gradient Overlays */}
        <div
          className="absolute top-0 right-0 bottom-0 w-20 sm:w-[100px] md:w-40 lg:w-[200px] xl:w-[253px]"
          style={{
            background: 'linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgb(255, 255, 255) 100%)',
          }}
        />
      </div>

      {/* Right Side - Content */}
      <div className="flex-1 bg-white px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-24 xl:py-[120px] flex items-center justify-center">
        <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 lg:gap-8 xl:gap-10 w-full max-w-3xl">
          <p className="font-extralight font-display text-primary_button text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl leading-tight sm:leading-tight md:leading-tight lg:leading-tight xl:leading-[104px]">
            Our Promise
          </p>

          <ul className="flex flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-8 text-base sm:text-lg md:text-2xl lg:text-3xl xl:text-[40px] leading-snug sm:leading-snug md:leading-snug lg:leading-10 xl:leading-11 font-medium text-[rgba(51,51,51,0.8)]">
            {promises.map((promise, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2 sm:mr-3 lg:mr-4">•</span>
                <span>{promise.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}