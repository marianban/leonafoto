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
  const { images, loadMore, abort, inProgress, moreToLoad } = useGetImages({
    size: 12,
  });

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
        disabled={inProgress || !moreToLoad}
      >
        {inProgress && <span className="gallery__more-images__spinner" />}
        {moreToLoad ? 'Ďalšie fotky' : 'Žiadne ďalšie fotky'}
      </button>
    </>
  );
};
