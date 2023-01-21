'use client';

export const LogoWrapper = ({ children }: { children: React.ReactNode }) => {
  const handleLogoClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.scrollTo({ top: 0, left: 0 });
  };
  return (
    <a href="/" onClick={handleLogoClick}>
      {children}
    </a>
  );
};
