'use client';

import Image, { StaticImageData } from 'next/image';
import { Image as HeroImage } from './types';

export const ImageWidth = 410;
export const HeroImgWidth = ImageWidth + 10 + 10;

interface HeroImgProps {
  src: string;
  left: number;
  loading: boolean;
  image: HeroImage;
}

export const HeroImg = ({ src, left, loading, image }: HeroImgProps) => {
  return (
    <figure
      aria-hidden="true"
      className="hero-img"
      style={{
        transform: `translateX(${image.left}px)`,
      }}
    >
      {image.loading && (
        <div
          className="hero-img__loading"
          style={{ width: ImageWidth, height: 278 }}
        >
          <div className="hero-img__loading__spinner" />
        </div>
      )}

      {!image.loading && (
        <Image
          src={`/gallery/${image.src}`}
          alt=""
          width={ImageWidth}
          height={278}
          priority={true}
        />
      )}
    </figure>
  );
};
