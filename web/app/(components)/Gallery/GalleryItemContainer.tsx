'use client';

type Props = {
  children: React.ReactNode;
};

export const GalleryItemContainer = ({ children }: Props) => {
  return <div className="gallery-item-container">{children}</div>;
};
