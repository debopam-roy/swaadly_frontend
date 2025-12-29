import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Swaadly',
  description: 'Read Swaadly\'s Privacy Policy to understand how we collect, use, and protect your personal information when you visit or make a purchase from our website.',
  keywords: 'Swaadly, Privacy Policy, Data Protection, Personal Information, User Privacy, DPDPA',
  openGraph: {
    title: 'Privacy Policy - Swaadly',
    description: 'Read Swaadly\'s Privacy Policy to understand how we collect, use, and protect your personal information when you visit or make a purchase from our website.',
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

interface SubsectionProps {
  title: string;
  children: React.ReactNode;
}

function Subsection({ title, children }: SubsectionProps) {
  return (
    <div className="space-y-3">
      <h3 className="font-medium text-base md:text-lg lg:text-xl text-[#333]">
        {title}
      </h3>
      <div className="space-y-3">
        {children}
      </div>
    </div>
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

export default function PrivacyPolicyPage() {
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
              Privacy Policy
            </h1>
            <p className="font-medium text-base md:text-lg lg:text-xl leading-normal md:leading-relaxed text-[#333] w-full">
              This Privacy Policy describes how Swaadly (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) collects, uses, and protects your personal information when you visit or make a purchase from our website (the &ldquo;Site&rdquo;). By using the Site, you agree to the terms of this Privacy Policy.
            </p>
          </header>

          {/* Content Sections */}
          <div className="flex flex-col gap-10 md:gap-12 lg:gap-15 px-0 md:px-8 lg:px-15">
            <Section title="1. Information We Collect">
              <p className="mb-0">
                We collect information to process your orders, improve our products and services, and provide a better experience on the Site.
              </p>

              <Subsection title="(a) Device & Usage Information">
                <p className="mb-0">
                  When you visit the Site, we automatically collect certain information about your device and how you use the Site, such as:
                </p>
                <ul className="list-disc mb-0 space-y-2">
                  <ListItem>IP address and approximate location</ListItem>
                  <ListItem>Browser type and version</ListItem>
                  <ListItem>Device type and operating system</ListItem>
                  <ListItem>Date, time, and duration of visits</ListItem>
                  <ListItem>Pages viewed, products seen, clicks and navigation patterns</ListItem>
                  <ListItem>Referring website or ad (if any)</ListItem>
                </ul>
                <p className="mb-0 mt-4">
                  <strong>Why we collect it:</strong>
                </p>
                <ul className="list-disc mb-0 space-y-2">
                  <ListItem>To load the Site properly for your device</ListItem>
                  <ListItem>To keep the Site secure and prevent misuse</ListItem>
                  <ListItem>To analyse usage and improve design, performance, and content</ListItem>
                  <ListItem>To understand what products and pages are most interesting to visitors</ListItem>
                </ul>
                <p className="mb-0 mt-4">
                  We collect this information using cookies, log files, and similar technologies.
                </p>
              </Subsection>

              <Subsection title="(b) Order & Account Information">
                <p className="mb-0">
                  When you place an order or create an account, we may collect:
                </p>
                <ul className="list-disc mb-0 space-y-2">
                  <ListItem>Name</ListItem>
                  <ListItem>Mobile number</ListItem>
                  <ListItem>Email address</ListItem>
                  <ListItem>Billing address</ListItem>
                  <ListItem>Shipping/delivery address</ListItem>
                  <ListItem>Order details (products, quantity, price, date/time)</ListItem>
                  <ListItem>Payment-related details (payment method, payment status; not full card/UPI details)</ListItem>
                </ul>
                <p className="mb-0 mt-4">
                  <strong>Why we collect it:</strong>
                </p>
                <ul className="list-disc mb-0 space-y-2">
                  <ListItem>To process and deliver your orders</ListItem>
                  <ListItem>To confirm your order and send updates</ListItem>
                  <ListItem>To provide invoices/receipts and order history</ListItem>
                  <ListItem>To detect and prevent fraud or suspicious activities</ListItem>
                  <ListItem>To provide customer support and resolve issues</ListItem>
                </ul>
                <p className="mb-0 mt-4">
                  This information is collected directly from you when you enter it on the Site.
                </p>
              </Subsection>

              <Subsection title="(c) Payment Information">
                <p className="mb-0">
                  Payments on Swaadly are processed by our payment gateway partners. We do not store your full card numbers, CVV, or UPI PIN on our servers.
                </p>
                <p className="mb-0">
                  We may receive from the payment gateway:
                </p>
                <ul className="list-disc mb-0 space-y-2">
                  <ListItem>A masked card number or payment method reference</ListItem>
                  <ListItem>Payment status (success/failure)</ListItem>
                  <ListItem>Transaction ID, date, time, and amount</ListItem>
                </ul>
                <p className="mb-0 mt-4">We use this to:</p>
                <ul className="list-disc mb-0 space-y-2">
                  <ListItem>Confirm your payment</ListItem>
                  <ListItem>Link the payment to your order</ListItem>
                  <ListItem>Handle refunds or adjustments where applicable</ListItem>
                </ul>
              </Subsection>

              <Subsection title="(d) Customer Support & Communication">
                <p className="mb-0">
                  When you contact us (via email, WhatsApp, phone, web forms, or support chat tools), we may collect:
                </p>
                <ul className="list-disc mb-0 space-y-2">
                  <ListItem>Your name and contact details</ListItem>
                  <ListItem>Your order ID(s)</ListItem>
                  <ListItem>Details of your query, complaint, or feedback</ListItem>
                  <ListItem>Photos/videos of products or packaging, if you share them</ListItem>
                </ul>
                <p className="mb-0 mt-4">We use this information to:</p>
                <ul className="list-disc mb-0 space-y-2">
                  <ListItem>Respond to your requests and resolve issues</ListItem>
                  <ListItem>Improve our products, packaging, and service quality</ListItem>
                  <ListItem>Maintain records for training and quality control</ListItem>
                </ul>
              </Subsection>

              <Subsection title="(e) Marketing & Preferences (If You Opt In)">
                <p className="mb-0">
                  If you choose to receive marketing communications from us, we may collect:
                </p>
                <ul className="list-disc mb-0 space-y-2">
                  <ListItem>Your name</ListItem>
                  <ListItem>Email address</ListItem>
                  <ListItem>Mobile number / WhatsApp number</ListItem>
                  <ListItem>Your preferences or responses to campaigns</ListItem>
                </ul>
                <p className="mb-0 mt-4">We use this to:</p>
                <ul className="list-disc mb-0 space-y-2">
                  <ListItem>Send you updates about new products, offers, discounts, and brand news</ListItem>
                  <ListItem>Personalise our messages where possible</ListItem>
                </ul>
                <p className="mb-0 mt-4">
                  You can opt out of marketing at any time by following the instructions in our messages or by contacting us at{' '}
                  <a
                    href="mailto:support@swaadly.com"
                    className="text-[#C68642] hover:text-[#A66929] underline transition-colors"
                  >
                    support@swaadly.com
                  </a>
                  .
                </p>
              </Subsection>
            </Section>

            <Section title="2. Minors">
              <p className="mb-0">
                Our Site and products are not intentionally targeted at children under 13 years of age.
              </p>
              <p className="mb-0">
                If you are a parent or guardian and believe your child has shared personal information with us, please contact us at{' '}
                <a
                  href="mailto:support@swaadly.com"
                  className="text-[#C68642] hover:text-[#A66929] underline transition-colors"
                >
                  support@swaadly.com
                </a>{' '}
                and we will remove it where appropriate.
              </p>
            </Section>

            <Section title="3. How We Use Your Information">
              <p className="mb-0">We use your information to:</p>
              <ul className="list-disc mb-0 space-y-2">
                <ListItem>Operate and maintain the Swaadly Site</ListItem>
                <ListItem>Process your orders and payments</ListItem>
                <ListItem>Arrange delivery with our logistics partners</ListItem>
                <ListItem>Communicate order confirmations, updates, and service messages</ListItem>
                <ListItem>Provide customer support and handle issues</ListItem>
                <ListItem>Improve our products, packaging, and user experience</ListItem>
                <ListItem>Show you relevant products and offers (where permitted)</ListItem>
                <ListItem>Maintain security and prevent fraud or abuse</ListItem>
                <ListItem>Comply with applicable Indian laws and regulations</ListItem>
              </ul>
            </Section>

            <Section title="4. How We Share Your Information">
              <p className="mb-0">
                We may share your information with trusted third parties who help us run Swaadly, such as:
              </p>
              <ul className="list-disc mb-0 space-y-2">
                <ListItem>Payment gateway providers – to process your payments securely</ListItem>
                <ListItem>Courier/logistics partners – to deliver your orders and provide tracking</ListItem>
                <ListItem>SMS/email/WhatsApp service providers – to send OTPs, order updates, and service messages</ListItem>
                <ListItem>Chat/support tools – to provide live customer support</ListItem>
                <ListItem>Analytics or advertising partners – to understand site usage and, where used, to show relevant ads</ListItem>
              </ul>
              <p className="mb-0 mt-4">We may also share information if:</p>
              <ul className="list-disc mb-0 space-y-2">
                <ListItem>Required by law, court order, or government authority</ListItem>
                <ListItem>Necessary to protect our rights, property, or safety, or that of our customers or the public</ListItem>
              </ul>
              <p className="mb-0 mt-4">
                <strong>We do not sell your personal information.</strong>
              </p>
              <p className="mb-0">
                If Swaadly is ever involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction, subject to this Privacy Policy.
              </p>
            </Section>

            <Section title="5. Cookies & Tracking Technologies">
              <p className="mb-0">
                Cookies are small text files stored on your device when you visit our Site.
              </p>
              <p className="mb-0">Swaadly uses cookies to:</p>
              <ul className="list-disc mb-0 space-y-2">
                <ListItem>Keep you logged in</ListItem>
                <ListItem>Remember your cart and preferences</ListItem>
                <ListItem>Analyse how visitors use the Site</ListItem>
                <ListItem>(If enabled) Support advertising or remarketing</ListItem>
              </ul>
              <p className="mb-0 mt-4">
                <strong>You can control cookies from your browser settings:</strong>
              </p>
              <p className="mb-0">
                You may block or delete cookies, but some features (like keeping items in your cart or staying logged in) may not work properly if you do so.
              </p>
            </Section>

            <Section title="6. Online Advertising & Analytics">
              <p className="mb-0">
                We may use tools like Google Analytics or similar services to understand how customers use our Site, and we may run ads on platforms like Google or Meta (Facebook/Instagram).
              </p>
              <p className="mb-0">These tools may collect information about:</p>
              <ul className="list-disc mb-0 space-y-2">
                <ListItem>Pages you visit</ListItem>
                <ListItem>Products you view or purchase</ListItem>
                <ListItem>Actions taken on the Site</ListItem>
              </ul>
              <p className="mb-0 mt-4">We use this to:</p>
              <ul className="list-disc mb-0 space-y-2">
                <ListItem>Measure traffic and performance</ListItem>
                <ListItem>Improve our website and campaigns</ListItem>
                <ListItem>Show more relevant ads and offers (where applicable)</ListItem>
              </ul>
              <p className="mb-0 mt-4">You can:</p>
              <ul className="list-disc mb-0 space-y-2">
                <ListItem>Manage cookies in your browser</ListItem>
                <ListItem>Adjust ad settings on platforms like Google or Meta</ListItem>
                <ListItem>Use opt-out tools provided by those platforms or industry groups (where available)</ListItem>
              </ul>
            </Section>

            <Section title="7. Data Storage & Retention">
              <p className="mb-0">
                We store your information on secure servers or systems used by us or our service providers.
              </p>
              <p className="mb-0">We keep your information for as long as necessary to:</p>
              <ul className="list-disc mb-0 space-y-2">
                <ListItem>Complete your orders and provide services</ListItem>
                <ListItem>Maintain records for tax, accounting, and legal purposes</ListItem>
                <ListItem>Handle disputes and enforce our agreements</ListItem>
                <ListItem>Improve our products and services</ListItem>
              </ul>
              <p className="mb-0 mt-4">
                When information is no longer needed, we will securely delete or anonymise it where reasonably possible.
              </p>
            </Section>

            <Section title="8. Security">
              <p className="mb-0">
                We use reasonable technical and organisational measures to protect your information from unauthorised access, misuse, or loss.
              </p>
              <p className="mb-0">
                However, no method of transmission over the internet or electronic storage is completely secure. While we strive to protect your data, we cannot guarantee absolute security.
              </p>
            </Section>

            <Section title="9. Your Choices & Rights (India)">
              <p className="mb-0">As a user in India, you generally have the right to:</p>
              <ul className="list-disc mb-0 space-y-2">
                <ListItem>Access the basic personal information we hold about you (such as name, contact details, order history)</ListItem>
                <ListItem>Update or correct your information if it is inaccurate or incomplete</ListItem>
                <ListItem>Request deletion of your data, subject to our legal and business obligations (for example, records we must keep for tax or accounting)</ListItem>
                <ListItem>Opt out of marketing communications at any time</ListItem>
              </ul>
              <p className="mb-0 mt-4">To exercise these rights, you can:</p>
              <ul className="list-disc mb-0 space-y-2">
                <ListItem>Log in to your account and update details directly, where available; or</ListItem>
                <ListItem>
                  Contact us at{' '}
                  <a
                    href="mailto:support@swaadly.com"
                    className="text-[#C68642] hover:text-[#A66929] underline transition-colors"
                  >
                    support@swaadly.com
                  </a>{' '}
                  with your name, contact details, and a clear description of your request.
                </ListItem>
              </ul>
              <p className="mb-0 mt-4">
                We may need to verify your identity before processing certain requests.
              </p>
            </Section>

            <Section title="10. Changes to This Privacy Policy">
              <p className="mb-0">We may update this Privacy Policy from time to time to reflect:</p>
              <ul className="list-disc mb-0 space-y-2">
                <ListItem>Changes in how Swaadly operates</ListItem>
                <ListItem>Changes in technology</ListItem>
                <ListItem>Changes in applicable Indian laws or regulatory requirements</ListItem>
              </ul>
              <p className="mb-0 mt-4">
                The updated Policy will be posted on this page with a new &ldquo;Last updated&rdquo; date. We recommend checking this page periodically.
              </p>
            </Section>

            <Section title="11. Compliance with Indian Data Protection Law (DPDPA)">
              <p className="mb-0">
                We process your personal information in accordance with applicable Indian laws, including the Digital Personal Data Protection Act, 2023 (DPDPA), to the extent applicable to our business.
              </p>
            </Section>

            <Section title="12. Governing Law & Jurisdiction">
              <p className="mb-0">
                This Privacy Policy shall be governed by and construed in accordance with the laws of India.
              </p>
              <p className="mb-0">
                Any disputes arising in connection with this Privacy Policy shall be subject to the exclusive jurisdiction of the courts in Delhi, India.
              </p>
            </Section>

            <Section title="13. Contact Us">
              <p className="mb-0">
                If you have any questions, concerns, or complaints about this Privacy Policy or how we handle your information, please contact us:
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
