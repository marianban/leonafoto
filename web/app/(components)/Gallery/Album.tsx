'use client';
import { useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';

import { useEffect } from 'react';
import './Album.css';
import { useGetImages } from './useGetImages';
import { AngleLeft } from '../icons/AngleLeft';
import { AngleRight } from '../icons/AngleRight';
import { Times } from '../icons/Times';

type AlbumProps = {
  imageIndex: number;
  onClose: () => void;
};

export const Album = ({ onClose, imageIndex }: AlbumProps) => {
  const { images, loadMore } = useGetImages({ size: 10000 });
  const [currentImageIndex, setCurrentImage] = useState(imageIndex);
  const [nextCurrentImageIndex, setNextCurrentImage] = useState(0);
  const prevImageIndex =
    (currentImageIndex - 1 + images.length) % images.length;
  const nextImageIndex = (currentImageIndex + 1) % images.length;
  const nodeRef = useRef<HTMLImageElement | null>(null);
  const albumRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<Animation | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    loadMore();
  }, [loadMore]);

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      if (
        !event.target ||
        !albumRef.current ||
        albumRef.current.contains(event.target as Node)
      ) {
        return;
      }
      onClose();
    };
    document.addEventListener('mousedown', handleMouseDown);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [onClose, albumRef]);

  useLayoutEffect(() => {
    if (images.length === 0) {
      return;
    }
    const image = document.querySelector<HTMLElement>(
      `#image-${images[currentImageIndex].id.toString()}`
    );
    if (image) {
      image.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }
  }, [currentImageIndex, images]);

  useLayoutEffect(() => {
    if (!animationRef.current) {
      return;
    }
    animationRef.current.finished.then(() => {
      setCurrentImage(nextCurrentImageIndex);
    });
  }, [animationRef, nextCurrentImageIndex]);

  useEffect(() => {
    if (!animationRef.current) {
      return;
    }
    animationRef.current?.cancel();
    // setTimeout(() => {
    //   animationRef.current?.cancel();
    // }, 100);
  }, [currentImageIndex]);

  if (images.length === 0) {
    return null;
  }

  const currentImage = images[currentImageIndex];
  const prevImage = images[prevImageIndex];
  const nextImage = images[nextImageIndex];

  const handleSelectImage = (index: number) => {
    setCurrentImage(index);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!touchStartRef.current) {
      return;
    }

    const start = touchStartRef.current;
    const end = {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY,
    };
    const direction = Math.sign(end.x - start.x);
    const distance = Math.hypot(end.x - start.x, end.y - start.y);
    const angle = Math.atan2(end.y - start.y, end.x - start.x);
    // is swipe left
    if (direction === -1 && distance > 50 && Math.abs(angle) < 0.5) {
      handleNextImage();
    }
    // is swipe right
    if (direction === 1 && distance > 50 && Math.abs(angle) < 0.5) {
      handlePrevImage();
    }
  };

  const animateImage = (imageIndex: number, keyframeTo: Keyframe) => {
    if (!nodeRef.current) {
      return;
    }
    if (animationRef.current) {
      animationRef.current.finish();
      animationRef.current.cancel();
    }
    setNextCurrentImage(imageIndex % images.length);
    const animation = nodeRef.current.animate(
      [{ transform: 'translateX(0)', opacity: 1 }, keyframeTo],
      {
        easing: 'ease-in',
        duration: 250,
        fill: 'forwards',
      }
    );
    animationRef.current = animation;
  };

  const animateNextImage = (imageIndex: number) => {
    animateImage(imageIndex, { transform: 'translateX(100%)', opacity: 0 });
  };

  const handleNextImage = () => {
    animateNextImage(currentImageIndex + 1);
  };

  const animatePrevImage = (imageIndex: number) => {
    animateImage(imageIndex, { transform: 'translateX(-100%)', opacity: 0 });
  };

  const handlePrevImage = () => {
    animatePrevImage(currentImageIndex - 1 + images.length);
  };

  return (
    <div className="album" ref={albumRef}>
      <div className="album__previews">
        {images.map((image, i) => {
          const aspectRatio = image.width / image.height;
          return (
            <div
              className={`album__preview ${
                i === currentImageIndex ? 'album__preview--selected' : ''
              }`}
              key={image.id}
              onClick={() => handleSelectImage(i)}
              id={`image-${image.id.toString()}`}
            >
              <Image
                src={`/gallery/${image.name}`}
                alt={image.name}
                width={200}
                height={200 / aspectRatio}
              />
            </div>
          );
        })}
      </div>
      <div
        className="album__image"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <Image
          key={prevImage.name}
          src={`/gallery/${prevImage.name}`}
          alt={prevImage.name}
          fill={true}
          style={{ opacity: nextCurrentImageIndex === prevImageIndex ? 1 : 0 }}
        />
        <Image
          key={nextImage.name}
          src={`/gallery/${nextImage.name}`}
          alt={nextImage.name}
          fill={true}
          style={{ opacity: nextCurrentImageIndex === nextImageIndex ? 1 : 0 }}
        />
        <Image
          key={currentImage.name}
          ref={nodeRef}
          src={`/gallery/${currentImage.name}`}
          alt={currentImage.name}
          fill={true}
        />
        <div className="album__image__controls">
          <AngleLeft onClick={handlePrevImage} />
          <AngleRight onClick={handleNextImage} />
        </div>
      </div>

      <button onClick={onClose} className="album__close">
        <Times /> Zatvoriť
      </button>
    </div>
  );
};
