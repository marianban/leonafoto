'use client';

import { HeroImg, HeroImgWidth } from './HeroImg';
import { useWindowSize } from './useWindowSize';

import { useCallback, useState, useEffect, useLayoutEffect } from 'react';
import { useAnimationFrame } from './useAnimationFrame';
import { useRandomImages } from './useRandomImages';

interface Image {
  src: string;
  left: number;
}

export const HeroContent = () => {
  const { width } = useWindowSize();
  const [offset, setOffset] = useState(0);
  const [images, setImages] = useState<Image[]>([]);
  const { loadMore, abort, isLoading } = useRandomImages();

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
        }).then((srcs) =>
          setImages(
            srcs.map((src, index) => ({
              src,
              left: HeroImgWidth * index,
            }))
          )
        );
      } else {
        if (numberOfImages !== images.length) {
          if (numberOfImages < images.length) {
            setImages((images) => images.slice(0, numberOfImages));
          }
          if (numberOfImages > images.length) {
            const imagesToAdd = numberOfImages - images.length;
            loadMore({
              size: imagesToAdd,
              excluded: images.map((i) => i.src),
            }).then((srcs) => {
              setImages((images) => [
                ...images,
                ...srcs.map((src) => ({
                  src,
                  left: -HeroImgWidth,
                })),
              ]);
            });
          }
        }
      }
    }
  }, [loadMore, width, images, isLoading]);

  useAnimationFrame(
    useCallback(
      (delta: number) => {
        if (width !== undefined) {
          // math.round to make sure it always starts at 0
          setOffset((o) => Math.round(o + delta / 30));
        }
      },
      [setOffset, width]
    )
  );

  useLayoutEffect(() => {
    setImages((images) =>
      images.map((image, index) => ({
        ...image,
        left:
          HeroImgWidth * index -
          (offset % (-HeroImgWidth * (images.length / 2))),
      }))
    );
  }, [offset, setImages]);

  useLayoutEffect(() => {
    if (images.length && images.every((image) => image.left >= 0)) {
      setImages((images) => {
        const newImages = images
          .slice(0, images.length / 2)
          .map((image) => ({ ...image }));
        const lastImages = images.slice(images.length / 2);
        lastImages.forEach((image, index) => {
          newImages[index].src = image.src;
        });
        return [...newImages, ...lastImages].map((image, index) => ({
          ...image,
          left: image.left - 0.1,
        }));
      });

      loadMore({
        size: images.length / 2,
        excluded: images.slice(0, images.length / 2).map((i) => i.src),
      }).then((srcs) => {
        // console.log(srcs);
        // console.log(
        //   images.slice(images.length / 2).length,
        //   images.slice(0, images.length / 2).length
        // );

        setImages((images) => [
          ...images.slice(0, images.length / 2).map((i) => ({ ...i })),
          ...images.slice(images.length / 2).map((image, index) => ({
            ...image,
            src: srcs[index],
          })),
        ]);
      });
    }
  }, [images, loadMore]);

  return (
    <>
      {images.map((image, index) => (
        <HeroImg key={index} src={`/gallery/${image.src}`} left={image.left} />
      ))}
    </>
  );
};
