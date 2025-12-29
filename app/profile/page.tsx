'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useProtectedRoute } from '@/lib/hooks/use-protected-route';
import { useAuth } from '@/lib/contexts/auth.context';

interface ProfileCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}

function ProfileCard({ title, description, href, icon }: ProfileCardProps) {
  return (
    <Link href={href} className="block">
      <div className="bg-white hover:shadow-lg transition-all rounded-2xl md:rounded-3xl overflow-hidden flex items-stretch shadow-md cursor-pointer group">
        {/* Left peanut section with icon */}
        <div className="bg-[var(--peanut)] w-20 md:w-48 flex items-center justify-center p-3 md:p-6 shrink-0">
          <div className="text-white scale-75 md:scale-100">
            {icon}
          </div>
        </div>

        {/* Right white section with text */}
        <div className="flex-1 p-4 md:p-8 flex items-center justify-between">
          <div>
            <h2 className="text-lg md:text-3xl font-semibold mb-1 md:mb-2 text-black">{title}</h2>
            <p className="text-gray-600 text-xs md:text-base">{description}</p>
          </div>
          <div className="ml-3 md:ml-6 shrink-0">
            <svg
              className="w-5 h-5 md:w-8 md:h-8 text-gray-400 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function ProfilePage() {
  const { isLoading } = useProtectedRoute();
  const { user } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Left Section - Title and Cards */}
          <div className="space-y-4 md:space-y-8">
            <h1
              className="text-3xl md:text-4xl font-display text-white italic"
              style={{
                WebkitTextStroke: '2px var(--peanut)',
                paintOrder: 'stroke fill',
                fontWeight: 700,
                textShadow: '0px 4px 0px #C68642',
              } as React.CSSProperties}
            >
              Hello, {user?.profile.displayName}
            </h1>

            <div className="space-y-3 md:space-y-6">
              <ProfileCard
                title="Your Orders"
                description="Track or buy things again"
                href="/orders"
                icon={
                  <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                }
              />

              <ProfileCard
                title="Your Addresses"
                description="Edit or add new address"
                href="/profile/addresses"
                icon={
                  <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                }
              />

              <ProfileCard
                title="Update your profile"
                description="Edit your details"
                href="/profile/edit"
                icon={
                  <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                }
              />
            </div>
          </div>

          {/* Product Image Section - Mobile & Desktop */}
          <div className="flex items-center justify-center mt-4 md:mt-0">
            <div className="relative w-full h-64 md:h-full min-h-[400px]">
              <Image
                src="https://storage.googleapis.com/swaadly-uploads-prod/peanut_butter.svg"
                alt="Peanut Butter Products"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
