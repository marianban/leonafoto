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

export const HeroContent = () => {
  const { width } = useWindowSize();
  const [offset, setOffset] = useState(0);
  const [images, setImages] = useState<Image[]>([]);
  const lastIdRef = useRef(0);
  const { loadMore, abort, isLoading } = useRandomImages({ lastIdRef });

  useEffect(() => {
    return () => {
      abort();
    };
  }, [abort]);

  useEffect(() => {
    if (width !== undefined && !isLoading) {
      const numberOfImages = Math.ceil(width / HeroImgWidth) * 2;
      if (images.length === 0) {
        loadMore({
          size: numberOfImages,
          excluded: images.map((i) => i.src),
        }).then((imgs) => {
          setImages(
            fillSrcs(imgs, numberOfImages, lastIdRef).map((img, index) => ({
              ...img,
              left: HeroImgWidth * index - 0.1,
            }))
          );
        });
      } else {
        if (numberOfImages !== images.length) {
          if (numberOfImages < images.length) {
            setImages((images) => images.slice(0, numberOfImages));
          }
          if (numberOfImages > images.length) {
            loadMore({
              size: numberOfImages,
              excluded: images.map((i) => i.src),
            }).then((imgs) => {
              setImages(
                fillSrcs(imgs, numberOfImages, lastIdRef).map((img, index) => ({
                  ...img,
                  left: HeroImgWidth * index - 0.1,
                }))
              );
            });
          }
        }
      }
    }
  }, [loadMore, width, images, isLoading, setImages]);

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

        const imagesToLoad = lastImages.map((i) => ({
          ...i,
          loading: true,
          id: `loading-${i.id}`,
        }));

        return [...alreadyLoadedImages, ...imagesToLoad].map((img) => ({
          ...img,
          left: img.left - 0.1,
        }));
      }
      return newImages;
    });
  }, [offset, setImages]);

  useLayoutEffect(() => {
    const loadingImages = images.filter((i) => i.loading);
    const loadedImages = images.filter((i) => !i.loading);

    if (loadingImages.length === 0 || isLoading) {
      return;
    }

    loadMore({
      size: loadingImages.length,
      excluded: loadedImages.map((i) => i.src),
    }).then((imgs) => {
      if (imgs.length === 0) {
        return;
      }

      setImages((images) => {
        return [
          ...images.slice(0, images.length / 2).map((i) => ({ ...i })),
          ...images.slice(images.length / 2).map((image, index) => ({
            ...image,
            loading: false,
            id: imgs[index].id,
            src: imgs[index].src,
          })),
        ];
      });
    });
  }, [images, loadMore, isLoading, setImages]);

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
