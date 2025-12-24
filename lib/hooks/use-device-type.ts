'use client';

import { useState, useEffect } from 'react';

export type DeviceType = 'DESKTOP' | 'MOBILE';

// Breakpoint for mobile/desktop - matches Tailwind's md breakpoint
const MOBILE_BREAKPOINT = 768;

export function useDeviceType(): DeviceType {
  const [deviceType, setDeviceType] = useState<DeviceType>('DESKTOP');

  useEffect(() => {
    const checkDeviceType = () => {
      setDeviceType(window.innerWidth < MOBILE_BREAKPOINT ? 'MOBILE' : 'DESKTOP');
    };

    // Check on mount
    checkDeviceType();

    // Listen for resize events
    window.addEventListener('resize', checkDeviceType);

    return () => {
      window.removeEventListener('resize', checkDeviceType);
    };
  }, []);

  return deviceType;
}
