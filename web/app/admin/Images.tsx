'use client';

import { useEffect, useCallback } from 'react';
import { ClientGalleryImage } from '../(components)/Gallery/ClientGalleryImage';
import '../(components)/Gallery/Gallery.css';
import { useGetImages } from '../(components)/Gallery/useGetImages';

export const Images = () => {
  const { images, loadMore } = useGetImages();

  const loadMoreImages = useCallback(() => {
    loadMore(images.at(-1)?.id);
  }, [images, loadMore]);

  useEffect(() => {
    loadMore();
  }, [loadMore]);

  useEffect(() => {
    window.addEventListener('images-uploaded', loadMoreImages);

    return () => {
      window.removeEventListener('images-uploaded', loadMoreImages);
    };
  }, [loadMoreImages]);

  const handleLoadMore = () => {
    loadMore(images.at(-1)?.id);
  };

  return (
    <div>
      <h2 id="galeria">Galéria</h2>
      <div className="gallery__items">
        {images.map((image) => (
          <ClientGalleryImage key={image.id} image={image} />
        ))}
      </div>
      <button onClick={handleLoadMore}>Load more</button>
    </div>
  );
};
