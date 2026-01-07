'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/lib/contexts/auth.context';
import { Package, MapPin, UserPen, ChevronRight, type LucideIcon } from 'lucide-react';

interface ProfileCardProps {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

function ProfileCard({ title, description, href, icon: Icon }: ProfileCardProps) {
  return (
    <Link href={href} className="block">
      <div className="bg-white hover:shadow-lg transition-all rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden flex items-stretch shadow-sm cursor-pointer group">
        {/* Left peanut section with icon */}
        <div className="bg-[var(--peanut)] w-16 sm:w-20 md:w-28 lg:w-36 min-h-[70px] sm:min-h-[80px] md:min-h-[90px] lg:min-h-[100px] shrink-0 flex items-center justify-center">
          <Icon className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-white" strokeWidth={1.5} />
        </div>

        {/* Right white section with text */}
        <div className="flex-1 p-3 sm:p-4 md:p-5 lg:p-6 flex items-center justify-between min-w-0">
          <div className="flex-1 min-w-0 mr-2">
            <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold mb-0.5 md:mb-1 text-gray-900 truncate">
              {title}
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm md:text-base line-clamp-1">
              {description}
            </p>
          </div>
          <div className="shrink-0">
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-400 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function ProfilePage() {
  const { user, isLoading } = useAuth();

  // Show loading state while checking authentication
  if (isLoading || !user) {
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

            <div className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">
              <ProfileCard
                title="Your Orders"
                description="Track or buy things again"
                href="/orders"
                icon={Package}
              />

              <ProfileCard
                title="Your Addresses"
                description="Edit or add new address"
                href="/profile/addresses"
                icon={MapPin}
              />

              <ProfileCard
                title="Update your profile"
                description="Edit your details"
                href="/profile/edit"
                icon={UserPen}
              />
            </div>
          </div>

          {/* Product Image Section - Mobile & Desktop */}
          <div className="flex items-center justify-center mt-4 md:mt-0">
            <div className="relative w-full h-64 md:h-full min-h-[400px]">
              <Image
                src="https://storage.googleapis.com/swaadly-uploads-prod/Profile_page_image.png"
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