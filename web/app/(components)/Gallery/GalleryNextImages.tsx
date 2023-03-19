'use client';

import { useEffect } from 'react';
import { ClientGalleryImage } from './ClientGalleryImage';
import { useGetImages } from './useGetImages';

export const GalleryNextImages = ({
  prevImageId,
  startIndex,
}: {
  prevImageId?: number;
  startIndex: number;
}) => {
  const { images, loadMore, abort, inProgress } = useGetImages({ size: 12 });

  const handleLoadMore = () => {
    loadMore(images.at(-1)?.id ?? prevImageId);
  };

  useEffect(() => {
    return () => {
      abort();
    };
  }, [abort]);

  return (
    <>
      {images.map((image, index) => (
        <ClientGalleryImage
          key={image.id}
          image={image}
          index={startIndex + index}
        />
      ))}
      <button
        type="button"
        onClick={handleLoadMore}
        className="gallery__more-images"
        disabled={inProgress}
      >
        {inProgress && <span className="gallery__more-images__spinner" />}
        Ďalšie fotky
      </button>
    </>
  );
};
