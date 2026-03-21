'use client';

import Link from 'next/link';

export const LogoWrapper = ({ children }: { children: React.ReactNode }) => {
  const handleLogoClick = () => {
    window.scrollTo({ top: 0, left: 0 });
  };
  return (
    <Link href="/" onClick={handleLogoClick}>
      {children}
    </Link>
  );
};
