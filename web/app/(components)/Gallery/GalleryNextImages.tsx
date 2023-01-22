'use client';

import { ClientGalleryImage } from './ClientGalleryImage';
import { useGetImages } from './useGetImages';

export const GalleryNextImages = ({ prevImageId }: { prevImageId: number }) => {
  const { images, loadMore } = useGetImages({ size: 12 });

  const handleLoadMore = () => {
    loadMore(images.at(-1)?.id ?? prevImageId);
  };
  return (
    <>
      {images.map((image) => (
        <ClientGalleryImage key={image.id} image={image} />
      ))}
      <button
        type="button"
        onClick={handleLoadMore}
        className="gallery__more-images"
      >
        Ďalšie fotky
      </button>
    </>
  );
};
