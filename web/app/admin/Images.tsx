'use client';

import { useEffect } from 'react';
import { ClientGalleryImage } from '../(components)/Gallery/ClientGalleryImage';
import '../(components)/Gallery/Gallery.css';
import { useGetImages } from '../(components)/Gallery/useGetImages';

export const Images = () => {
  const { images, loadMore } = useGetImages();

  useEffect(() => {
    loadMore();
    window.addEventListener('images-uploaded', loadMore);

    return () => {
      window.removeEventListener('images-uploaded', loadMore);
    };
  }, [loadMore]);

  const handleLoadMore = () => {
    loadMore();
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
