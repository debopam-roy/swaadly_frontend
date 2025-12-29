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
      <div className="relative w-[410px] h-[800px] shrink-0">
        <Image
          src="/images/promise.svg"
          alt="Our Promise"
          fill
          className="object-cover"
        />

        {/* Gradient Overlays */}
        <div className="absolute top-0 left-0 right-0 h-[357px] bg-linear-to-b from-white to-transparent backdrop-blur-[0.5px]" />
        <div className="absolute bottom-0 left-0 right-0 h-[177px] bg-linear-to-t from-white to-transparent backdrop-blur-[0.5px]" />
        <div
          className="absolute top-0 right-0 bottom-0 w-[253px]"
          style={{
            background: 'linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgb(255, 255, 255) 100%)',
          }}
        />
      </div>

      {/* Right Side - Content */}
      <div className="flex-1 bg-green-200 py-[120px] flex items-center justify-center">
        <div className="flex flex-col gap-10 w-full">
          <p className="font-extralight font-display text-primary_button text-8xl leading-[104px]">
            Our Promise
          </p>

          <ul className="flex flex-col gap-8 text-[40px] leading-11 font-medium text-[rgba(51,51,51,0.8)]">
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
