'use client';
import { useState } from 'react';
import Image from 'next/image';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQCategory {
  title: string;
  faqs: FAQ[];
}

const faqData: FAQCategory[] = [
  {
    title: 'Product Information',
    faqs: [
      {
        question: 'What ingredients are in your peanut butter?',
        answer: 'Our peanut butter is made with 100% roasted peanuts. The Creamy and Crunchy variants contain only peanuts with no added sugar, salt, or preservatives. The Chocolate variant includes natural cocoa powder and a touch of natural sweetener for that rich chocolate taste.',
      },
      {
        question: "What's the difference between 500g and 1kg sizes?",
        answer: 'Both sizes contain the same premium quality peanut butter. The 500g jar is perfect for trying out new flavors or for smaller households, while the 1kg jar offers better value for regular consumers and larger families.',
      },
      {
        question: 'Which flavor should I choose?',
        answer: 'Choose Creamy for a smooth, spreadable texture perfect for sandwiches and smoothies. Pick Crunchy if you love the extra crunch of peanut pieces in every bite. Try Chocolate for a delicious twist on classic peanut butter with rich cocoa flavor.',
      },
      {
        question: 'Is your peanut butter suitable for fitness enthusiasts?',
        answer: 'Absolutely! Our peanut butter is rich in protein, healthy fats, and essential nutrients, making it an excellent choice for pre-workout or post-workout nutrition. It helps in muscle recovery and provides sustained energy.',
      },
    ],
  },
  {
    title: 'Storage & Shelf Life',
    faqs: [
      {
        question: 'How should I store the peanut butter?',
        answer: 'Store in a cool, dry place away from direct sunlight. Refrigeration is not required but can extend shelf life. Always use a clean, dry spoon to avoid contamination.',
      },
      {
        question: 'What is the shelf life of your products?',
        answer: 'Our peanut butter has a shelf life of 18 months from the date of manufacturing when stored properly. The best before date is clearly printed on each jar.',
      },
      {
        question: 'Why does oil separate at the top?',
        answer: "Oil separation is natural and indicates there are no artificial stabilizers. Simply stir well before use to mix the natural oils back in. This doesn't affect quality or taste.",
      },
    ],
  },
  {
    title: 'Shipping & Delivery',
    faqs: [
      {
        question: 'Where do you deliver?',
        answer: 'We currently deliver pan-India to all serviceable pin codes. Enter your pin code at checkout to verify delivery availability in your area.',
      },
      {
        question: 'How long does delivery take?',
        answer: 'Delivery typically takes 5-7 business days depending on your location. Metro cities usually receive orders within 3-5 days. You will receive a tracking number once your order is shipped. NOTE:- All the above timelines are estimated not actual.',
      },
      {
        question: 'Is the packaging safe for shipping?',
        answer: 'Yes! We use sturdy, food-grade IML PET plastic jars with secure lids, packed with protective cushioning and shipped in 3-layer corrugated boxes to help ensure your peanut butter reaches you safely without leakage or damage.',
      },
    ],
  },
  {
    title: 'Health & Dietary',
    faqs: [
      {
        question: 'Is your peanut butter vegan?',
        answer: 'Yes, all our peanut butter variants are 100% vegan. They contain no animal products or by-products, making them suitable for vegan and vegetarian diets.',
      },
      {
        question: 'Does it contain gluten?',
        answer: 'Our peanut butter is naturally gluten-free. However, it is processed in a facility that may handle gluten-containing products. Please check the label if you have severe allergies.',
      },
      {
        question: 'Can diabetics consume your peanut butter?',
        answer: 'The Creamy and Crunchy variants with no added sugar can be consumed by diabetics in moderation as part of a balanced diet. Always consult your healthcare provider for personalized dietary advice.',
      },
      {
        question: 'Is it safe for children?',
        answer: 'Yes, our peanut butter is safe for children above 1 year of age, provided they have no peanut allergies. It\'s a nutritious addition to their diet, offering protein and healthy fats for growth.',
      },
    ],
  },
  {
    title: 'Returns & Support',
    faqs: [
      {
        question: 'What is your return policy?',
        answer: "We don't accept returns. If your product arrives damaged, leaking, or unusable, we'll provide a replacement after verification. Please contact our support team within 24 hours of delivery to initiate the replacement request.",
      },
      {
        question: 'How can I contact customer support?',
        answer: 'You can reach us via email at support@swaadly.com or chat support on the website. We typically respond within 24 hours.',
      },
      {
        question: 'Do you offer bulk or wholesale purchases?',
        answer: 'Yes! We offer special pricing for bulk orders and wholesale partnerships. Please email us at sales@swaadly.com with your requirements, and our team will get back to you with a customized quote.',
      },
    ],
  },
];

const categories = [
  'All Questions',
  'Product Information',
  'Storage & Shelf Life',
  'Shipping & Delivery',
  'Health & Dietary',
  'Returns & Support',
];

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function AccordionItem({ question, answer, isOpen, onToggle }: AccordionItemProps) {
  return (
    <div className="bg-white border border-[#f3f4f6] rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-2 p-6 text-left"
        aria-expanded={isOpen}
      >
        <span className="flex-1 font-medium tracking-[-0.1504px] ">
          {question}
        </span>
        <Image
          src="/images/black_arrow.svg"
          alt=""
          width={24}
          height={24}
          className={`transition-transform duration-200 shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div className="px-6 pb-6">
          <p className="leading-[22.75px] tracking-[-0.1504px] text-[#4a5565]">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}

export default function FAQsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Questions');
  const [openFAQs, setOpenFAQs] = useState<{ [key: string]: boolean }>({
    'What ingredients are in your peanut butter?': true,
  });

  const toggleFAQ = (question: string) => {
    setOpenFAQs((prev) => ({
      ...prev,
      [question]: !prev[question],
    }));
  };

  const filteredData =
    selectedCategory === 'All Questions'
      ? faqData
      : faqData.filter((category) => category.title === selectedCategory);

  return (
    <main className="min-h-screen">
      <div className="max-w-5xl mx-auto px-8 py-8 space-y-8">
        {/* Page Title */}
        <h1 className="text-3xl md:text-4xl font-display text-white italic text-center tracking-wideer"
              style={{
                WebkitTextStroke: '2px var(--peanut)',
                paintOrder: 'stroke fill',
                fontWeight: 700,
                textShadow: '0px 4px 0px #C68642',
              } as React.CSSProperties}
            >
          Frequently Asked Questions
        </h1>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full tracking-[-0.1504px] transition-all cursor-pointer ${
                selectedCategory === category
                  ? 'bg-primary_button text-white shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]'
                  : 'bg-white text-black border border-[#e5e7eb]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ Sections */}
        <div className="space-y-8">
          {filteredData.map((category) => (
            <div key={category.title} className="space-y-4">
              {/* Category Title */}
              <div className="flex items-center gap-3">
                <div className="w-1 h-6 bg-[#ff7e29] rounded-full" />
                <h2 className="text-base tracking-[-0.3125px] font-normal ">
                  {category.title}
                </h2>
              </div>

              {/* FAQ Items */}
              <div className="space-y-3">
                {category.faqs.map((faq) => (
                  <AccordionItem
                    key={faq.question}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={openFAQs[faq.question] || false}
                    onToggle={() => toggleFAQ(faq.question)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
