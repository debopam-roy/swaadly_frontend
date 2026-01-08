import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - Swaadly',
  description: 'Get in touch with Swaadly. For any questions or concerns related to shipping, delivery, or our products, reach out to us via email or visit our warehouse.',
  keywords: 'Swaadly, Contact, Support, Customer Service, Peanut Butter, Kota, Rajasthan',
  openGraph: {
    title: 'Contact Us - Swaadly',
    description: 'Get in touch with Swaadly. For any questions or concerns related to shipping, delivery, or our products, reach out to us via email or visit our warehouse.',
    type: 'website',
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-15 pt-12 md:pt-15 lg:pt-20 pb-16 md:pb-24">
        <div className="flex flex-col gap-12 md:gap-16 lg:gap-20">
          {/* Header Section */}
          <header className="flex flex-col gap-4 md:gap-6 items-center justify-center px-0 md:px-8 lg:px-15 py-2">
            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-display text-white italic text-center tracking-wideer"
              style={{
                WebkitTextStroke: '2px var(--peanut)',
                paintOrder: 'stroke fill',
                fontWeight: 700,
                textShadow: '0px 4px 0px #C68642',
              } as React.CSSProperties}
            >
              Contact Us
            </h1>
            <p className="font-medium text-base md:text-lg lg:text-xl leading-normal md:leading-relaxed text-[#333] text-center max-w-2xl">
              Have a question or need help? We&apos;d love to hear from you. Reach out to us and we&apos;ll get back to you as soon as possible.
            </p>
          </header>

          {/* Contact Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 px-0 md:px-8 lg:px-15">
            {/* Email Card */}
            <div className="bg-white border-[1px] border-black rounded-[32px] p-6 md:p-8 lg:p-10 shadow-[4px_4px_0px_0px_#333] hover:shadow-[6px_6px_0px_0px_#333] transition-shadow">
              <div className="flex flex-col gap-4">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-[#FFE4B4] rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-7 h-7 md:w-8 md:h-8 text-[#C68642]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="font-medium text-xl md:text-2xl text-[#333]">
                    Email Us
                  </h2>
                  <p className="text-sm md:text-base text-[#666] leading-relaxed">
                    For any questions or concerns related to shipping, delivery, or our products, you can reach us at:
                  </p>
                  <a
                    href="mailto:support@swaadly.com"
                    className="text-[#C68642] hover:text-[#A66929] font-medium text-base md:text-lg underline transition-colors mt-2"
                  >
                    support@swaadly.com
                  </a>
                </div>
              </div>
            </div>

            {/* Address Card */}
            <div className="bg-white border-[1px] border-black rounded-[32px] p-6 md:p-8 lg:p-10 shadow-[4px_4px_0px_0px_#333] hover:shadow-[6px_6px_0px_0px_#333] transition-shadow">
              <div className="flex flex-col gap-4">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-[#FFE4B4] rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-7 h-7 md:w-8 md:h-8 text-[#C68642]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="font-medium text-xl md:text-2xl text-[#333]">
                    Warehouse Location
                  </h2>
                  <p className="text-sm md:text-base text-[#666] leading-relaxed">
                    Our warehouse and distribution center is located at:
                  </p>
                  <address className="not-italic text-[#333] font-medium text-base md:text-lg leading-relaxed mt-2">
                    A 38 Ujjawal Vihar<br />
                    Borkheda, Kota<br />
                    Rajasthan - 324002<br />
                    India
                  </address>
                </div>
              </div>
            </div>

            {/* Registered Address Card */}
            <div className="bg-white border-[1px] border-black rounded-[32px] p-6 md:p-8 lg:p-10 shadow-[4px_4px_0px_0px_#333] hover:shadow-[6px_6px_0px_0px_#333] transition-shadow">
              <div className="flex flex-col gap-4">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-[#FFE4B4] rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-7 h-7 md:w-8 md:h-8 text-[#C68642]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="font-medium text-xl md:text-2xl text-[#333]">
                    Registered Office
                  </h2>
                  <p className="text-sm md:text-base text-[#666] leading-relaxed">
                    Our registered office address is:
                  </p>
                  <address className="not-italic text-[#333] font-medium text-base md:text-lg leading-relaxed mt-2">
                    A-804, Four Season<br />
                    Rajeev Gandhi, Vigyan Nagar<br />
                    Kota, Rajasthan - 324005<br />
                    India
                  </address>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info Section */}
          <div className="bg-[#FFF8F0] border-[1px] border-black rounded-[32px] p-6 md:p-10 lg:p-12 mx-0 md:mx-8 lg:mx-15">
            <div className="flex flex-col gap-6 items-center text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-[#44C997] rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 md:w-10 md:h-10 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h2 className="font-medium text-xl md:text-2xl lg:text-3xl text-[#333]">
                We&apos;re Here to Help
              </h2>
              <p className="text-sm md:text-base lg:text-lg text-[#666] leading-relaxed max-w-2xl">
                Whether you have questions about our products, need assistance with an order, or just want to say hello, our team is ready to assist you. We typically respond within 24-48 hours.
              </p>
              <a
                href="mailto:support@swaadly.com"
                className="inline-flex items-center gap-2 bg-[#44C997] hover:bg-[#3BB585] text-white font-medium text-base md:text-lg px-8 py-4 rounded-full transition-colors mt-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Send us an Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
