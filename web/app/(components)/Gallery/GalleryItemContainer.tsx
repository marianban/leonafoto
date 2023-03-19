'use client';

import { ImageDto } from '../../../pages/api/ImageDto';

type Props = {
  children: React.ReactNode;
  image: ImageDto;
};

export const GalleryItemContainer = ({ children, image }: Props) => {
  return <div className="gallery-item-container">{children}</div>;
};
