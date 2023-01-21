'use client';

import { HeroImg, HeroImgWidth } from './HeroImg';
import image1 from './images/1.jpg';
import image2 from './images/2.jpg';
import image3 from './images/3.jpg';
import { useWindowSize } from './useWindowSize';

import { useCallback, useState } from 'react';
import { useAnimationFrame } from './useAnimationFrame';

const images = [image1, image2, image3];

export const HeroContent = () => {
  const { width } = useWindowSize();
  const [offset, setOffset] = useState(0);

  useAnimationFrame(
    useCallback((delta: number) => {
      setOffset((o) => o + delta / 30);
    }, [])
  );

  if (width === undefined) {
    return null;
  }

  const numberOfImages = Math.ceil(width / HeroImgWidth);

  return (
    <>
      {[...new Array(numberOfImages * 2)].map((_, index) => (
        <HeroImg
          key={index}
          src={images[index % images.length]}
          left={
            HeroImgWidth * index - (offset % (-HeroImgWidth * numberOfImages))
          }
        />
      ))}
    </>
  );
};
