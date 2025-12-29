import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - Swaadly',
  description: 'Read Swaadly\'s Terms of Service to understand the rules and regulations governing the use of our website and the purchase of our products.',
  keywords: 'Swaadly, Terms of Service, Terms and Conditions, Legal Terms, User Agreement',
  openGraph: {
    title: 'Terms of Service - Swaadly',
    description: 'Read Swaadly\'s Terms of Service to understand the rules and regulations governing the use of our website and the purchase of our products.',
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

export default function TermsOfServicePage() {
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
              Terms & Conditions
            </h1>
            <p className="font-medium text-base md:text-lg lg:text-xl leading-normal md:leading-relaxed text-[#333] w-full">
              Welcome to Swaadly. These Terms & Conditions (&ldquo;Terms&rdquo;) govern your access to and use of our website (the &ldquo;Site&rdquo;) and your purchase of products from us. By accessing or using the Site, or by placing an order, you agree to be bound by these Terms, along with our Privacy Policy, Shipping & Delivery Policy, and Refund & Replacement Policy.
            </p>
          </header>

          {/* Content Sections */}
          <div className="flex flex-col gap-10 md:gap-12 lg:gap-15 px-0 md:px-8 lg:px-15">
            <Section title="1. About Swaadly & Eligibility">
              <p className="mb-0">
                This Site is operated by Swaadly (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;).
              </p>
              <p className="mb-0">
                By using the Site, you represent that you are at least 18 years old and legally capable of entering into binding contracts under Indian law.
              </p>
              <p className="mb-0">
                If you allow a minor to use the Site under your supervision, you are responsible for their actions and any purchases made.
              </p>
            </Section>

            <Section title="2. Acceptance & Changes to These Terms">
              <p className="mb-0">
                By visiting the Site and/or purchasing from us, you are using our Service and agree to these Terms.
              </p>
              <p className="mb-0">
                We may update or modify these Terms at any time by posting a revised version on this page.
              </p>
              <p className="mb-0">
                Your continued use of the Site after changes are posted means you accept the updated Terms. If you do not agree with the changes, you must stop using the Site.
              </p>
            </Section>

            <Section title="3. Use of the Site">
              <p className="mb-0">You agree to:</p>
              <ul className="list-disc mb-0 space-y-2">
                <ListItem>Use the Site only for lawful purposes and in accordance with these Terms.</ListItem>
                <ListItem>Not attempt to damage, interfere with, or hack the Site or any related systems.</ListItem>
                <ListItem>Not upload or transmit any viruses, malicious code, spam, or harmful content.</ListItem>
              </ul>
              <p className="mb-0 mt-4">
                We reserve the right to refuse service, block access, or cancel orders at our discretion if we believe your use of the Site is abusive, fraudulent, or unlawful.
              </p>
            </Section>

            <Section title="4. Information on the Site">
              <p className="mb-0">
                We aim to keep product information (ingredients, nutrition, allergens, prices, availability) accurate and up to date. However, occasional errors, inaccuracies, or omissions may occur.
              </p>
              <p className="mb-0">
                Information on the Site is for general information only and should not be treated as medical or professional advice.
              </p>
              <p className="mb-0">
                We may update, modify, or remove content on the Site at any time without obligation to notify you.
              </p>
              <p className="mb-0">
                Your use of any information or materials on this Site is entirely at your own risk.
              </p>
            </Section>

            <Section title="5. Products, Pricing & Availability">
              <ul className="list-disc mb-0 space-y-2">
                <ListItem>All prices are shown in Indian Rupees (INR) and may be inclusive or exclusive of taxes, as indicated at checkout.</ListItem>
                <ListItem>Prices, offers, and discounts are subject to change without prior notice.</ListItem>
                <ListItem>Product images and colours are for representation; actual products may vary slightly in appearance.</ListItem>
                <ListItem>We may limit the quantity of any product, or restrict sales to certain persons or regions, at our sole discretion.</ListItem>
                <ListItem>All products are subject to availability. We may cancel orders where products are out of stock or discontinued.</ListItem>
              </ul>
            </Section>

            <Section title="6. Orders & Contract Formation">
              <p className="mb-0">
                Product listings on the Site are an invitation to offer, not a binding offer. When you place an order, you are making an offer to purchase products from us.
              </p>
              <p className="mb-0">A contract is formed only when:</p>
              <ul className="list-disc mb-0 space-y-2">
                <ListItem>Your payment is successfully processed, and</ListItem>
                <ListItem>We confirm your order by email/message or by displaying a confirmation page.</ListItem>
              </ul>
              <p className="mb-0 mt-4">
                We may cancel or refuse any order (even after payment) for reasons including, but not limited to: product unavailability, errors in product information or pricing, suspicious or fraudulent activities, or incorrect or incomplete address/contact details.
              </p>
              <p className="mb-0">
                If we cancel an order after payment, we will refund the amount paid for that order as per our Refund & Replacement Policy and payment gateway/bank timelines.
              </p>
            </Section>

            <Section title="7. Payments (Prepaid Only – No COD)">
              <p className="mb-0">
                All orders on Swaadly are prepaid only. We currently do not offer Cash on Delivery (COD).
              </p>
              <p className="mb-0">We accept digital payment methods such as:</p>
              <ul className="list-disc mb-0 space-y-2">
                <ListItem>Credit/debit cards</ListItem>
                <ListItem>Net banking</ListItem>
                <ListItem>UPI</ListItem>
                <ListItem>Wallets or other options provided by our payment gateway partner(s)</ListItem>
              </ul>
              <p className="mb-0 mt-4">
                By choosing a payment method, you agree to any terms, conditions, and limits imposed by your bank or payment provider.
              </p>
              <p className="mb-0">We are not responsible for:</p>
              <ul className="list-disc mb-0 space-y-2">
                <ListItem>Payment failures, declines, or delays caused by your bank/payment provider</ListItem>
                <ListItem>Charges, fees, or interest levied by your bank/payment provider</ListItem>
              </ul>
              <p className="mb-0 mt-4">
                The payment facility we provide is a convenience; we are not a bank or financial institution.
              </p>
            </Section>

            <Section title="8. Billing & Account Information">
              <p className="mb-0">You agree to:</p>
              <ul className="list-disc mb-0 space-y-2">
                <ListItem>Provide current, complete, and accurate purchase and account information.</ListItem>
                <ListItem>Promptly update your details (email, phone, address, etc.) so we can process your orders and contact you if needed.</ListItem>
              </ul>
              <p className="mb-0 mt-4">We reserve the right to:</p>
              <ul className="list-disc mb-0 space-y-2">
                <ListItem>Refuse or cancel any order you place with us.</ListItem>
                <ListItem>Limit quantities per person, household, or order.</ListItem>
                <ListItem>Restrict orders using the same customer account, payment method, billing, or shipping address if we suspect misuse or reseller activity.</ListItem>
              </ul>
              <p className="mb-0 mt-4">
                If we change or cancel an order, we may attempt to notify you using the contact details provided at the time of order.
              </p>
            </Section>

            <Section title="9. Shipping, Delivery & Cancellations">
              <p className="mb-0">
                Shipping and delivery are governed by our Shipping & Delivery Policy. Estimated delivery dates are indicative and may vary due to courier or external factors.
              </p>
              <p className="mb-0">
                You are responsible for providing accurate and complete delivery details.
              </p>
              <p className="mb-0">Order cancellations are subject to our Refund & Replacement Policy:</p>
              <ul className="list-disc mb-0 space-y-2">
                <ListItem>Generally allowed only before the order is packed/shipped.</ListItem>
                <ListItem>Once shipped, cancellation may not be possible.</ListItem>
              </ul>
            </Section>

            <Section title="10. Returns, Replacements & Refunds">
              <p className="mb-0">
                Because Swaadly sells food products, we follow an exchange/replacement-first approach.
              </p>
              <p className="mb-0">
                Our detailed rules for reporting damage, wrong item, or quality issues are set out in our Refund & Replacement Policy.
              </p>
              <p className="mb-0">
                Monetary refunds are not automatic; they are considered only in specific cases (e.g., product unavailable, replacement not possible) and handled as per that Policy.
              </p>
              <p className="mb-0">
                By placing an order, you agree to be bound by the terms of the Refund & Replacement Policy.
              </p>
            </Section>

            <Section title="11. User Content (Reviews, Feedback, etc.)">
              <p className="mb-0">
                If you submit any content to us (e.g., reviews, ratings, ideas, suggestions, feedback, photos):
              </p>
              <p className="mb-0">
                You grant Swaadly a non-exclusive, royalty-free, perpetual, worldwide licence to use, reproduce, edit, publish, and display such content in any media for marketing, product improvement, or other lawful purposes.
              </p>
              <p className="mb-0">You confirm that:</p>
              <ul className="list-disc mb-0 space-y-2">
                <ListItem>The content is your original work or you have the right to share it.</ListItem>
                <ListItem>It does not infringe any third-party rights (privacy, copyright, trademark, etc.).</ListItem>
                <ListItem>It is not defamatory, abusive, obscene, or unlawful.</ListItem>
              </ul>
              <p className="mb-0 mt-4">
                We may, but are not obliged to, monitor, edit, or remove content that we believe violates these Terms or applicable law.
              </p>
              <p className="mb-0">
                You are solely responsible for any content you submit and the consequences of sharing it.
              </p>
            </Section>

            <Section title="12. Prohibited Uses">
              <p className="mb-0">
                In addition to other restrictions in these Terms, you must not use the Site or its content:
              </p>
              <ul className="list-disc mb-0 space-y-2">
                <ListItem>For any unlawful purpose or to encourage unlawful activity</ListItem>
                <ListItem>To harass, abuse, defame, threaten, or harm others</ListItem>
                <ListItem>To submit false, misleading, or fraudulent information</ListItem>
                <ListItem>To upload malware, viruses, or harmful code</ListItem>
                <ListItem>To attempt to gain unauthorised access to our systems or other users&apos; accounts</ListItem>
                <ListItem>To collect or track personal information of others without consent</ListItem>
                <ListItem>To send spam, phishing, or unsolicited messages</ListItem>
                <ListItem>To reverse engineer, copy, or exploit any part of the Site or its software without written permission</ListItem>
              </ul>
              <p className="mb-0 mt-4">
                We may terminate or restrict your access to the Site if we believe you are engaging in prohibited use.
              </p>
            </Section>

            <Section title="13. Intellectual Property">
              <p className="mb-0">
                All content and material on the Site, including logos, trademarks, brand names, text, graphics, images, product photos, design, layout, user interface, software, code, and other proprietary information, are owned by Swaadly or its licensors and are protected by applicable intellectual property laws.
              </p>
              <p className="mb-0">You may not:</p>
              <ul className="list-disc mb-0 space-y-2">
                <ListItem>Copy, reproduce, distribute, modify, or create derivative works</ListItem>
                <ListItem>Use any trademarks, logos, or branding without our written permission</ListItem>
              </ul>
              <p className="mb-0 mt-4">
                Except as allowed for your personal, non-commercial use of the Site.
              </p>
            </Section>

            <Section title="14. Third-Party Tools & Links">
              <p className="mb-0">
                We may provide access to third-party tools (e.g., payment gateways, chat widgets) or links to third-party websites.
              </p>
              <p className="mb-0">
                These third parties are not controlled by us. We are not responsible for their content, policies, or practices.
              </p>
              <p className="mb-0">
                Your use of third-party tools or websites is at your own risk. Please review their terms and privacy policies before using their services.
              </p>
            </Section>

            <Section title="15. Disclaimer of Warranties">
              <p className="mb-0">
                You expressly agree that your use of the Site and Services is at your sole risk.
              </p>
              <p className="mb-0">
                The Site, its content, and all products and services offered are provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis, without any warranties of any kind, whether express or implied, including but not limited to merchantability, fitness for a particular purpose, non-infringement, and accuracy, completeness, reliability, or availability.
              </p>
              <p className="mb-0">We do not guarantee that:</p>
              <ul className="list-disc mb-0 space-y-2">
                <ListItem>The Site will be uninterrupted, timely, secure, or error-free</ListItem>
                <ListItem>Any defects or errors will be corrected</ListItem>
                <ListItem>The results from using the Site or our products will meet your expectations</ListItem>
              </ul>
            </Section>

            <Section title="16. Limitation of Liability">
              <p className="mb-0">To the maximum extent permitted by law:</p>
              <p className="mb-0">
                Swaadly, its directors, employees, affiliates, partners, and service providers shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, revenue, data, or goodwill, arising out of your use of the Site or products.
              </p>
              <p className="mb-0">
                Our total aggregate liability for any claim related to any order or your use of the Site shall be limited to the amount you actually paid for that specific order.
              </p>
              <p className="mb-0">
                Some jurisdictions do not allow certain limitations; in such cases, our liability will be limited to the maximum extent allowed by law.
              </p>
              <p className="mb-0">
                Nothing in these Terms excludes liability that cannot be excluded under applicable law.
              </p>
            </Section>

            <Section title="17. Indemnity">
              <p className="mb-0">
                You agree to indemnify, defend, and hold harmless Swaadly and its directors, employees, agents, partners, and service providers from and against any claims, demands, losses, liabilities, and expenses (including reasonable legal fees) arising out of:
              </p>
              <ul className="list-disc mb-0 space-y-2">
                <ListItem>Your use of the Site</ListItem>
                <ListItem>Your breach of these Terms or any Policy</ListItem>
                <ListItem>Your violation of any law or third-party rights</ListItem>
              </ul>
            </Section>

            <Section title="18. Termination">
              <p className="mb-0">
                We may, at any time and without notice, suspend, limit, or terminate your access to the Site or any part of the Service if:
              </p>
              <ul className="list-disc mb-0 space-y-2">
                <ListItem>You breach these Terms or any Policy</ListItem>
                <ListItem>We are required to do so by law or authority</ListItem>
                <ListItem>We discontinue or materially modify the Site or a part of it</ListItem>
                <ListItem>There are technical or security issues</ListItem>
                <ListItem>We suspect fraud or misuse of the Site</ListItem>
              </ul>
              <p className="mb-0 mt-4">
                You may stop using the Site at any time. Termination will not affect any rights or obligations that have already accrued (for example, payment obligations or liabilities).
              </p>
            </Section>

            <Section title="19. Severability & No Waiver">
              <p className="mb-0">
                If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will continue in full force and effect.
              </p>
              <p className="mb-0">
                Our failure to enforce any right or provision of these Terms shall not be construed as a waiver of that right or provision.
              </p>
            </Section>

            <Section title="20. Governing Law & Jurisdiction">
              <p className="mb-0">
                These Terms and any dispute arising out of or in connection with the Site, your use of the Site, or any order from Swaadly shall be governed by and construed in accordance with the laws of India.
              </p>
              <p className="mb-0">
                You agree that the courts in Delhi, India shall have exclusive jurisdiction to hear and decide all such disputes.
              </p>
            </Section>

            <Section title="21. Force Majeure">
              <p className="mb-0">
                The Party affected by Force Majeure shall not assume any liability under this Agreement. However, subject to the Party affected by Force Majeure having taken its reasonable and practicable efforts to perform this Agreement, the Party claiming for exemption of the liabilities may only be exempted from performing such liability as within limitation of the part performance delayed or prevented by Force Majeure.
              </p>
            </Section>

            <Section title="22. Contact Us">
              <p className="mb-0">
                If you have any questions or concerns about these Terms, please contact:
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
              <p className="mb-0">
                <strong>Postal Address:</strong> Swaadly Foods Private Limited, A-804, FOUR SEASON, RAJEEV GANDHI, VIGYAN NAGAR, Kota, Rajasthan-324005
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
