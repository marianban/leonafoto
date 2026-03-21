'use client';

import { HeroImg, HeroImgWidth } from './HeroImg';
import { useWindowSize } from './useWindowSize';

import { useCallback, useState, useEffect, useRef } from 'react';
import { useAnimationFrame } from './useAnimationFrame';
import { useRandomImages } from './useRandomImages';
import type { Image } from './types';

const fillSrcs = (
  srcs: Omit<Image, 'left'>[],
  numberOfImages: number,
  lastIdRef: React.MutableRefObject<number>
) => {
  // srcs might be less than numberOfImages if there are not enough images
  // fill the rest with repeated images
  const newSrcs = new Array(numberOfImages).fill(0).map((_, index) => {
    const newIndex = index % srcs.length;
    if (newIndex === 0 && index !== 0) {
      lastIdRef.current += 1;
      return {
        ...srcs[newIndex],
        id: lastIdRef.current,
      };
    }
    return srcs[newIndex];
  });
  return newSrcs;
};

const takeNRandomItems = <T,>(items: T[], n: number): T[] => {
  const newItems = [...items];
  const takenItems = [];
  for (let i = 0; i < n; i++) {
    const randomIndex = Math.floor(Math.random() * newItems.length);
    takenItems.push(newItems[randomIndex]);
    newItems.splice(randomIndex, 1);
  }
  return takenItems;
};

export const HeroContent = () => {
  const { width } = useWindowSize();

  const [allImages, setAllImages] = useState<Omit<Image, 'left'>[]>();
  const [images, setImages] = useState<Image[]>([]);
  const offsetRef = useRef(0);
  const lastIdRef = useRef(0);
  const { loadMore, abort } = useRandomImages({ lastIdRef });
  const numberOfImages = width
    ? Math.ceil(width / HeroImgWidth) * 2
    : undefined;

  useEffect(() => {
    if (!width) {
      return;
    }

    loadMore({
      size: 100,
      excluded: [],
    }).then((imgs) => {
      setAllImages(imgs);
    });

    return () => {
      abort();
    };
  }, [abort, loadMore, width]);

  const animationCallback = useCallback(
    (delta: number) => {
      if (width === undefined) {
        return;
      }

      const nextOffset = Math.round(offsetRef.current + delta / 30);
      offsetRef.current = nextOffset;

      if (!allImages || numberOfImages === undefined) {
        return;
      }

      setImages((currentImages) => {
        let baseImages = currentImages;

        if (currentImages.length !== numberOfImages) {
          baseImages = fillSrcs(allImages, numberOfImages, lastIdRef).map(
            (img, index) => ({
              ...img,
              left: HeroImgWidth * index - 0.1,
            })
          );
        }

        if (baseImages.length === 0) {
          return baseImages;
        }

        const shift = nextOffset % (-HeroImgWidth * (baseImages.length / 2));
        const newImages = baseImages.map((image, index) => ({
          ...image,
          left: HeroImgWidth * index - shift,
        }));

        if (newImages.every((image) => image.left >= 0)) {
          const lastImages = newImages.slice(newImages.length / 2);

          const alreadyLoadedImages = newImages
            .slice(0, newImages.length / 2)
            .map((image, index) => ({
              ...image,
              id: lastImages[index].id,
              src: lastImages[index].src,
            }));

          const randomImages = takeNRandomItems(
            allImages.filter(
              (i) => !alreadyLoadedImages.some((li) => li.id === i.id)
            ),
            lastImages.length
          );

          const imagesToLoad = lastImages.map((img, i) => ({
            ...randomImages[i],
            left: img.left,
          }));

          return [...alreadyLoadedImages, ...imagesToLoad].map((img) => ({
            ...img,
            left: img.left - 0.1,
          }));
        }

        return newImages;
      });
    },
    [allImages, numberOfImages, setImages, width]
  );

  useAnimationFrame(animationCallback);

  return (
    <>
      {images.map((image) =>
        image.src ? (
          <HeroImg
            key={image.id}
            image={image}
          />
        ) : null
      )}
    </>
  );
};
