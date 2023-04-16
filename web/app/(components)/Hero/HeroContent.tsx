'use client';

import { HeroImg, HeroImgWidth } from './HeroImg';
import { useWindowSize } from './useWindowSize';

import {
  useCallback,
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react';
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

const takeNRandomItems = <T extends unknown>(items: T[], n: number): T[] => {
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

  const [offset, setOffset] = useState(0);
  const [allImages, setAllImages] = useState<Omit<Image, 'left'>[]>();
  const [images, setImages] = useState<Image[]>([]);
  const lastIdRef = useRef(0);
  const { loadMore, abort, isLoading } = useRandomImages({ lastIdRef });
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

  useEffect(() => {
    if (!allImages || allImages.length === 0) {
      return;
    }
    if (numberOfImages === undefined) {
      return;
    }

    if (numberOfImages < images.length) {
      setImages((images) => images.slice(0, numberOfImages));
    }
    if (numberOfImages > images.length) {
      setImages(
        fillSrcs(allImages, numberOfImages, lastIdRef).map((img, index) => ({
          ...img,
          left: HeroImgWidth * index - 0.1,
        }))
      );
    }
  }, [allImages, numberOfImages, images]);

  const animationCallback = useCallback(
    (delta: number) => {
      if (width !== undefined) {
        // math.round to make sure it always starts at 0
        setOffset((o) => Math.round(o + delta / 30));
      }
    },
    [setOffset, width]
  );

  useAnimationFrame(animationCallback);

  useLayoutEffect(() => {
    if (!allImages) {
      return;
    }

    setImages((images) => {
      const newImages = images.map((image, index) => ({
        ...image,
        left:
          HeroImgWidth * index -
          (offset % (-HeroImgWidth * (images.length / 2))),
      }));

      if (newImages.length && newImages.every((image) => image.left >= 0)) {
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
  }, [offset, setImages, allImages]);

  return (
    <>
      {images.map((image, index) =>
        image.src ? (
          <HeroImg
            key={image.id}
            src={`/gallery/${image.src}`}
            left={image.left}
            loading={image.loading}
            image={image}
          />
        ) : null
      )}
    </>
  );
};
