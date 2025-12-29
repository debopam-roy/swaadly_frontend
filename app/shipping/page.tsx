import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shipping & Delivery Policy - Swaadly',
  description: 'Learn about Swaadly\'s shipping and delivery policy, including order processing times, delivery timelines, shipping charges, and tracking information for orders across India.',
  keywords: 'Swaadly, Shipping Policy, Delivery Policy, Order Tracking, Delivery Timeline, Shipping Charges',
  openGraph: {
    title: 'Shipping & Delivery Policy - Swaadly',
    description: 'Learn about Swaadly\'s shipping and delivery policy, including order processing times, delivery timelines, shipping charges, and tracking information for orders across India.',
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

export default function ShippingPolicyPage() {
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
              Shipping & Delivery Policy
            </h1>
            <p className="font-medium text-base md:text-lg lg:text-xl leading-normal md:leading-relaxed text-[#333] w-full">
              This Shipping & Delivery Policy explains how orders placed on our website are processed, shipped, and delivered within India.
            </p>
          </header>

          {/* Content Sections */}
          <div className="flex flex-col gap-10 md:gap-12 lg:gap-15 px-0 md:px-8 lg:px-15">
            <Section title="1. Serviceable Locations">
              <p className="mb-0">
                We currently deliver Swaadly products to selected pincodes across India through our logistics partners.
              </p>
              <p className="mb-0">
                You can check serviceability for your location using the pincode checker on the product or checkout page.
              </p>
              <p className="mb-0">
                If your pincode is not serviceable, we will not be able to process delivery to that address.
              </p>
            </Section>

            <Section title="2. Order Processing & Dispatch">
              <p className="mb-0">
                Orders are usually processed and dispatched within <strong>24–48 hours</strong> of successful payment.
              </p>
              <p className="mb-0">
                Orders placed on Sundays or public holidays will typically be processed on the next working day.
              </p>
              <p className="mb-0">
                In case of unusual delays in dispatch (e.g., high order volume, operational issues), we will try to keep you informed.
              </p>
              <p className="mb-0 mt-4">
                <strong>Note:</strong> All orders are prepaid only. We currently do not offer Cash on Delivery (COD).
              </p>
            </Section>

            <Section title="3. Estimated Delivery Timelines">
              <p className="mb-0">Estimated delivery time after dispatch is:</p>
              <ul className="list-disc mb-0 space-y-2">
                <ListItem>
                  <strong>Metros & major cities:</strong> 4–5 working days
                </ListItem>
                <ListItem>
                  <strong>Other locations (rest of India):</strong> 4–7 working days
                </ListItem>
                <ListItem>
                  <strong>Remote locations / J&K / North East / difficult terrain:</strong> 5–9 working days
                </ListItem>
              </ul>
              <p className="mb-0 mt-4">
                <strong>These are indicative timelines only.</strong> Actual delivery time may vary based on your location, stock availability, and the logistics partner&apos;s network and operational conditions.
              </p>
            </Section>

            <Section title="4. Delivery Days & Time">
              <p className="mb-0">
                Deliveries are usually made <strong>Monday to Saturday</strong>, between approximately <strong>10:00 am and 7:00 pm</strong>, depending on the courier partner.
              </p>
              <p className="mb-0">
                A signature / OTP / delivery confirmation may be required upon delivery.
              </p>
              <p className="mb-0">
                If you are unavailable, the courier may attempt delivery again or contact you. In some cases, the package may be handed over to an authorised person at your address (family member, security guard, neighbour, etc.).
              </p>
              <p className="mb-0">
                <strong>Swaadly will not be responsible for goods signed for by an alternative person at the delivery address provided by you.</strong>
              </p>
            </Section>

            <Section title="5. Shipping Charges">
              <p className="mb-0">
                Shipping charges (if any) will be clearly displayed on the checkout page before you confirm and pay for your order.
              </p>
              <p className="mb-0">
                Shipping fees may vary based on order value, offers, delivery location, and ongoing promotions.
              </p>
              <p className="mb-0">
                From time to time, we may offer <strong>free shipping</strong> or <strong>reduced shipping</strong> on selected orders; such offers will be clearly mentioned on the Site when applicable.
              </p>
            </Section>

            <Section title="6. Order Tracking">
              <p className="mb-0">
                Once your order is dispatched, you will receive a <strong>tracking ID</strong> via email/SMS/WhatsApp (where available), along with the name of the logistics partner handling your shipment.
              </p>
              <p className="mb-0">
                Tracking information is usually live within 24-48 hours of dispatch, depending on the logistics partner&apos;s systems.
              </p>
              <p className="mb-0">
                You can also track your order from the <strong>&ldquo;My Orders&rdquo;</strong> section on the Site, where available.
              </p>
            </Section>

            <Section title="7. Undelivered / Returned Shipments">
              <p className="mb-0">
                Your order may be returned to us (&ldquo;RTO&rdquo;) and marked undelivered if:
              </p>
              <ul className="list-disc mb-0 space-y-2">
                <ListItem>The courier is unable to reach you after multiple attempts.</ListItem>
                <ListItem>The delivery address or contact number provided is incorrect or incomplete.</ListItem>
                <ListItem>You refuse to accept the shipment at the time of delivery.</ListItem>
              </ul>
              <p className="mb-0 mt-4">In such cases:</p>
              <ul className="list-disc mb-0 space-y-2">
                <ListItem>We will attempt to contact you to explore re-shipping, where possible.</ListItem>
                <ListItem>Re-delivery may attract additional shipping charges, which will be communicated to you.</ListItem>
                <ListItem>If we are unable to reach you or re-ship, your order may be cancelled in line with our Refund & Replacement Policy.</ListItem>
              </ul>
            </Section>

            <Section title="8. Shortages, Damages & Issues on Delivery">
              <p className="mb-0">
                Please check your package at the time of delivery as far as reasonably possible.
              </p>
              <p className="mb-0">
                Any shortages, physical damage, leakage, or wrong items received must be reported to us <strong>within 24 hours of delivery</strong>.
              </p>
              <p className="mb-0">
                To report an issue, please email{' '}
                <a
                  href="mailto:support@swaadly.com"
                  className="text-[#C68642] hover:text-[#A66929] underline transition-colors"
                >
                  support@swaadly.com
                </a>{' '}
                with:
              </p>
              <ul className="list-disc mb-0 space-y-2">
                <ListItem>Your Order ID, and</ListItem>
                <ListItem>Clear photos/videos of the outer box, inner packaging, and the affected product(s).</ListItem>
              </ul>
              <p className="mb-0 mt-4">
                All such issues will be handled as per our <strong>Refund & Replacement Policy</strong>.
              </p>
            </Section>

            <Section title="9. Delays & Force Majeure">
              <p className="mb-0">
                While we and our logistics partners strive to deliver your order within the estimated timelines, delays may occur due to reasons beyond our reasonable control, such as:
              </p>
              <ul className="list-disc mb-0 space-y-2">
                <ListItem>Natural disasters, extreme weather, or accidents</ListItem>
                <ListItem>Strikes, lockdowns, or labour disruptions</ListItem>
                <ListItem>Network or operational issues with logistics providers</ListItem>
                <ListItem>Government restrictions, roadblocks, or regulatory checks</ListItem>
                <ListItem>System failures, technical glitches, or other force majeure events</ListItem>
              </ul>
              <p className="mb-0 mt-4">
                In such cases, delivery may be delayed, and Swaadly shall not be liable for such delays. We will, however, make reasonable efforts to keep you informed where possible.
              </p>
            </Section>

            <Section title="10. Contact Us">
              <p className="mb-0">
                For any questions or concerns related to shipping or delivery, you can reach us at:
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
