'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { newsletterService } from '@/lib/services/newsletter.service';

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

function FooterLink({ href, children }: FooterLinkProps) {
  return (
    <Link
      href={href}
      className="hover:text-[#C68642] transition-colors font-medium text-base md:text-lg leading-7"
    >
      {children}
    </Link>
  );
}

interface SocialLinkProps {
  href: string;
  icon: string;
  alt: string;
  ariaLabel: string;
}

function SocialLink({ href, icon, alt, ariaLabel }: SocialLinkProps) {
  return (
    <Link
      href={href}
      className="flex items-center justify-center w-12 h-12 bg-white rounded-full hover:bg-[#F5EDE0] transition-colors"
      aria-label={ariaLabel}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image src={icon} alt={alt} width={24} height={24} className='w-20 shadow-xl rounded-full'/>
    </Link> 
  );
}

interface NewsletterFormProps {
  onSubmit?: (email: string) => void;
}

function NewsletterForm({ onSubmit }: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setMessage(null);

    try {
      const response = await newsletterService.subscribe(email, 'footer');
      setMessage({ type: 'success', text: response.message });
      setEmail('');

      // Call the optional onSubmit prop if provided
      if (onSubmit) {
        onSubmit(email);
      }

      // Clear success message after 5 seconds
      setTimeout(() => setMessage(null), 5000);
    } catch (error: unknown) {
      const errorMessage = error && typeof error === 'object' && 'message' in error
        ? (error as { message: string }).message
        : 'Failed to subscribe. Please try again.';
      setMessage({ type: 'error', text: errorMessage });

      // Clear error message after 5 seconds
      setTimeout(() => setMessage(null), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 md:gap-4 w-full">
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={isLoading}
        className="w-full px-6 py-4 border-[1] border-black rounded-full bg-white placeholder:text-[rgba(51,51,51,0.5)] focus:outline-none focus:ring-2 focus:ring-[#44c997] font-medium text-base disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-primary_button cursor-pointer font-medium text-lg py-4 rounded-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Subscribing...
          </>
        ) : (
          <>
            <Image src="/images/mail.svg" alt="" width={20} height={20} />
            Subscribe
          </>
        )}
      </button>
      {message && (
        <div
          className={`text-sm font-medium px-4 py-2 rounded-lg ${
            message.type === 'success'
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}
        >
          {message.text}
        </div>
      )}
    </form>
  );
}

interface FooterProps {
  onNewsletterSubscribe?: (email: string) => void;
}

export default function Footer({ onNewsletterSubscribe }:   FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#FFF] overflow-hidden border-t border-var(--primary_button)">
      {/* Background Decorative Image */}
      <div className="absolute inset-x-0 top-0 pointer-events-none w-full">
        <Image
          src="/images/footer_background.svg"
          alt="Peanut Butter Background Decoration"
          width={1920}
          height={200}
          className="w-full h-auto rotate-180 scale-y-[-1] scale-x-[-1] object-cover"
        />
      </div>

      {/* Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-6">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-15 mb-8">
          {/* Brand Column */}
          <div className="flex flex-col gap-4 ">
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo.svg"
                alt="Swaadly Logo"
                width={130}
                height={56}
                className="h-30 w-l-70"
              />
            </Link>
            <div className="flex flex-col gap-3 md:gap-4">
              <p className="font-medium text-lg leading-7 max-w-[254px]">
                India&apos;s first peanut butter brand which serves health with taste
              </p>
              <div className="flex gap-4">
                <SocialLink
                  href="https://instagram.com"
                  icon="/images/instagram.svg"
                  alt="Instagram"
                  ariaLabel="Follow us on Instagram"
                />
                <SocialLink
                  href="https://facebook.com"
                  icon="/images/facebook.svg"
                  alt="Facebook"
                  ariaLabel="Follow us on Facebook"
                />
                <SocialLink
                  href="https://twitter.com"
                  icon="/images/twitter.svg"
                  alt="Twitter"
                  ariaLabel="Follow us on Twitter"
                />
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="flex flex-col gap-6">
            <h3 className="font-bold text-2xl leading-8">
              Quick Links
            </h3>
            <nav className="flex flex-col gap-4 md:gap-5">
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/products">Our Products</FooterLink>
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="/promise">Our Promise</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
            </nav>
          </div>

          {/* Support Column */}
          <div className="flex flex-col gap-6">
            <h3 className="font-bold text-2xl leading-8">
              Support
            </h3>
            <nav className="flex flex-col gap-4 md:gap-5">
              <FooterLink href="/faqs">FAQs</FooterLink>
              <FooterLink href="/shipping">Shipping & Delivery</FooterLink>
              <FooterLink href="/returns">Return Policy</FooterLink>
              <FooterLink href="/terms">Terms & Conditions</FooterLink>
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
            </nav>
          </div>

          {/* Newsletter Column */}
          <div className="flex flex-col gap-5">
            <h3 className="font-bold text-2xl leading-8">
              Stay Updated
            </h3>
            <p className="font-medium text-base leading-6 max-w-[249px]">
              Subscribe to get special offers and updates
            </p>
            <NewsletterForm onSubmit={onNewsletterSubscribe} />
          </div>
        </div>

        {/* Divider */}
        <div className="border-t-2 border-[#cb8435] mb-6" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 font-medium text-base leading-6">
          <p className="text-center md:text-left">
            © {currentYear} Spread the Taste. All rights reserved.
          </p>
          <p className="flex items-center gap-1">
            Made with{' '}
            <span className="text-red-600" aria-label="love">
              ❤️
            </span>{' '}
            in India
          </p>
        </div>
      </div>
    </footer>
  );
}
