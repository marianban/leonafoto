'use client';

import Image, { StaticImageData } from 'next/image';

export const ImageWidth = 410;
export const HeroImgWidth = ImageWidth + 10 + 10;

interface HeroImgProps {
  src: StaticImageData;
  left: number;
}

export const HeroImg = ({ src, left }: HeroImgProps) => {
  return (
    <figure
      aria-hidden="true"
      className="hero-img"
      style={{
        transform: `translateX(${left}px)`,
      }}
    >
      <Image src={src} alt="" width={ImageWidth} height={278} priority={true} />
    </figure>
  );
};
