'use client';

import Image from 'next/image';
import { Image as HeroImage } from './types';
import { galleryImage } from '../galleryImage';

export const ImageWidth = 410;
export const HeroImgWidth = ImageWidth + 10 + 10;

interface HeroImgProps {
  image: HeroImage;
}

export const HeroImg = ({ image }: HeroImgProps) => {
  return (
    <figure
      aria-hidden="true"
      className="hero-img"
      style={{
        transform: `translateX(${image.left}px)`,
      }}
    >
      {image.loading && (
        <div className="hero-img__frame">
          <div className="hero-img__loading">
            <div className="hero-img__loading__spinner" />
          </div>
        </div>
      )}

      {!image.loading && (
        <div className="hero-img__frame">
          <Image
            src={galleryImage(image.src)}
            alt=""
            fill={true}
            sizes={`${ImageWidth}px`}
            priority={true}
          />
        </div>
      )}
    </figure>
  );
};
