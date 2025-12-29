import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Refund, Replacement & Cancellation Policy - Swaadly',
  description: 'Learn about Swaadly\'s refund, replacement, and cancellation policy for orders. Understand when replacements are offered and how to request order cancellations.',
  keywords: 'Swaadly, Refund Policy, Replacement Policy, Cancellation Policy, Return Policy, Order Cancellation',
  openGraph: {
    title: 'Refund, Replacement & Cancellation Policy - Swaadly',
    description: 'Learn about Swaadly\'s refund, replacement, and cancellation policy for orders. Understand when replacements are offered and how to request order cancellations.',
    type: 'website',
  },
};

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

function Section({ title, children }: SectionProps) {
  return (
    <section className="flex flex-col gap-4 md:gap-6">
      <h2 className="font-medium text-2xl md:text-3xl lg:text-4xl xl:text-[44px] leading-tight text-[#333]">
        {title}
      </h2>
      <div className="font-normal text-sm md:text-base lg:text-lg leading-relaxed text-[#333] space-y-4">
        {children}
      </div>
    </section>
  );
}

interface ListItemProps {
  children: React.ReactNode;
}

function ListItem({ children }: ListItemProps) {
  return (
    <li className="ml-6 md:ml-9">
      <span className="leading-relaxed">{children}</span>
    </li>
  );
}

export default function RefundReplacementPolicyPage() {
  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-15 pt-12 md:pt-15 lg:pt-20 pb-16 md:pb-24">
        <div className="flex flex-col gap-8 md:gap-1 lg:gap-12">
          {/* Header Section */}
          <header className="flex flex-col gap-4 md:gap-5 items-center justify-center px-0 md:px-8 lg:px-15 py-2">
            <h1 className="text-3xl md:text-4xl font-display text-white italic text-center tracking-wideer"
              style={{
                WebkitTextStroke: '2px var(--peanut)',
                paintOrder: 'stroke fill',
                fontWeight: 700,
                textShadow: '0px 4px 0px #C68642',
              } as React.CSSProperties}
            >
              Cancellation Policy
            </h1>
            <p className="font-medium text-base md:text-lg lg:text-xl leading-normal md:leading-relaxed text-[#333] w-full">
              This Policy applies to all orders placed on our website for Swaadly products.
            </p>
          </header>

          {/* Content Sections */}
          <div className="flex flex-col gap-10 md:gap-12 lg:gap-15 px-0 md:px-8 lg:px-15">
            <Section title="1. No Returns. No Refunds.">
              <p className="mb-0">
                <strong>We do not accept any returns of products once delivered.</strong>
              </p>
              <p className="mb-0">
                We do not offer refunds for delivered orders (no &ldquo;money back&rdquo; for taste, preference, or change of mind or minor external dents/scratches on packaging that do not affect product quality).
              </p>
              <p className="mb-0">
                Once an order is delivered in good condition and as per the order, the sale is final.
              </p>
            </Section>

            <Section title="2. When We Will Send a Replacement">
              <p className="mb-0">
                In a few rare and unfortunate cases, we will happily send a replacement (not a refund) if:
              </p>

              <div className="space-y-4">
                <div>
                  <p className="mb-2 font-medium text-lg md:text-xl">
                    <strong>Wrong products delivered</strong>
                  </p>
                  <p className="mb-0">
                    The product(s) you received do not match what you ordered.
                  </p>
                </div>

                <div>
                  <p className="mb-2 font-medium text-lg md:text-xl">
                    <strong>Missing products in the order</strong>
                  </p>
                  <p className="mb-0">
                    One or more items you paid for are missing from the parcel.
                  </p>
                </div>

                <div>
                  <p className="mb-2 font-medium text-lg md:text-xl">
                    <strong>Damaged products delivered</strong>
                  </p>
                  <p className="mb-0">
                    The jar/pouch is physically damaged, leaking, or not usable at the time of delivery.
                  </p>
                </div>
              </div>

              <p className="mb-0 mt-4">
                In these cases, we will ship a replacement product to you after verification.
              </p>
              <p className="mb-0">
                <strong>No money refund will be issued.</strong>
              </p>
            </Section>

            <Section title="3. Time Limit to Raise an Issue">
              <p className="mb-0">To be eligible for a replacement, you must:</p>
              <p className="mb-0">
                <strong>Raise your request within 24 hours of delivery.</strong>
              </p>
              <p className="mb-0">
                Requests made after 24 hours of delivery will not be eligible for replacement.
              </p>
            </Section>

            <Section title="4. Proof Required">
              <p className="mb-0">To process your replacement request, we need:</p>
              <ul className="list-disc mb-0 space-y-2">
                <ListItem>Your Order ID</ListItem>
                <ListItem>
                  Clear photos/videos showing:
                  <ul className="list-disc ml-6 mt-2 space-y-1">
                    <li>The outer box</li>
                    <li>The inner packaging</li>
                    <li>The product label (including batch/expiry, if visible)</li>
                    <li>The issue (wrong item, missing items, damage/leakage, etc.)</li>
                  </ul>
                </ListItem>
              </ul>
              <p className="mb-0 mt-4">
                <strong>Without clear proof, we may not be able to approve a replacement.</strong>
              </p>
            </Section>

            <Section title="5. Natural Oil Separation (No Replacement)">
              <p className="mb-0">
                Our nut butters may show natural oil separation on top of the jar. This is normal because we do not use artificial stabilisers.
              </p>
              <p className="mb-0">
                The oil you see is natural oil from the nuts.
              </p>
              <p className="mb-0">
                <strong>Please stir well before use.</strong>
              </p>
              <p className="mb-0">
                This is not considered damage or defect, and <strong>no replacement or refund will be provided</strong> for normal oil separation, taste variation, or texture preferences.
              </p>
            </Section>

            <Section title="6. How to Request a Replacement">
              <p className="mb-0">If you face one of the issues listed in Section 2:</p>
              <p className="mb-0 mt-4">
                Email us at{' '}
                <a
                  href="mailto:support@swaadly.com"
                  className="text-[#C68642] hover:text-[#A66929] underline transition-colors"
                >
                  support@swaadly.com
                </a>{' '}
                with:
              </p>
              <ul className="list-disc mb-0 space-y-2">
                <ListItem>
                  <strong>Subject:</strong> &ldquo;Replacement Request – Order [Order ID]&rdquo;
                </ListItem>
                <ListItem>Your name and registered mobile number</ListItem>
                <ListItem>Short description of the issue</ListItem>
                <ListItem>Required photos/videos as mentioned above</ListItem>
              </ul>
              <p className="mb-0 mt-4">
                Our team will review your request and usually respond within <strong>2–3 working days</strong> with the next steps.
              </p>
              <p className="mb-0">
                If your request is approved, we will arrange to ship the replacement product to your address.
              </p>
            </Section>

            <Section title="7. Cancellation Policy (Before Dispatch Only)">
              <p className="mb-0">Because we process food orders quickly:</p>
              <p className="mb-0">
                <strong>You may request cancellation only before the order is processed and dispatched.</strong>
              </p>
              <p className="mb-0">
                Once the order is packed or handed over to the courier, cancellation is not possible.
              </p>
              <p className="mb-0 mt-4">
                <strong>To request cancellation:</strong>
              </p>
              <p className="mb-0">
                Email{' '}
                <a
                  href="mailto:support@swaadly.com"
                  className="text-[#C68642] hover:text-[#A66929] underline transition-colors"
                >
                  support@swaadly.com
                </a>{' '}
                as soon as possible with subject:
              </p>
              <p className="mb-0 ml-6">
                &ldquo;Cancel Order [Order ID]&rdquo;
              </p>
              <p className="mb-0 mt-4">
                If the cancellation is confirmed by us before dispatch, we will:
              </p>
              <ul className="list-disc mb-0 space-y-2">
                <ListItem>Cancel the order, and</ListItem>
                <ListItem>Issue a refund to your original payment method (since the order was never shipped).</ListItem>
              </ul>
              <p className="mb-0 mt-4">
                <strong>Note:</strong> This is the only scenario where money is refunded – for successfully cancelled orders before dispatch. For delivered orders, there is no refund, only replacement in the specific cases listed.
              </p>
            </Section>

            <Section title="8. Misuse & Fraud">
              <p className="mb-0">Swaadly reserves the right to:</p>
              <ul className="list-disc mb-0 space-y-2">
                <ListItem>Reject replacement requests that appear to be fraudulent, abusive, or repetitive.</ListItem>
                <ListItem>Block or blacklist accounts that repeatedly misuse the replacement policy.</ListItem>
              </ul>
              <p className="mb-0 mt-4">
                <strong>All decisions regarding eligibility for replacement are at the sole discretion of Swaadly.</strong>
              </p>
            </Section>

            <Section title="9. Contact Us">
              <p className="mb-0">
                For any questions about this Policy or to raise an issue:
              </p>
              <p className="mb-0 mt-4">
                <strong>Email:</strong>{' '}
                <a
                  href="mailto:support@swaadly.com"
                  className="text-[#C68642] hover:text-[#A66929] underline transition-colors"
                >
                  support@swaadly.com
                </a>
              </p>
              <p className="mb-0 mt-6 text-sm md:text-base">
                <strong>Last updated:</strong> 25th December 2025
              </p>
            </Section>
          </div>
        </div>
      </div>
    </main>
  );
}
