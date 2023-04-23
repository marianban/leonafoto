'use client';

import { useEffect, useCallback } from 'react';
import { ClientGalleryImage } from '../(components)/Gallery/ClientGalleryImage';
import '../(components)/Gallery/Gallery.css';
import { useGetImages } from '../(components)/Gallery/useGetImages';
import { ImageDto } from '../../pages/api/ImageDto';

export const Images = () => {
  const { images, loadMore, refresh, deleteImageById } = useGetImages();

  const loadMoreImages = useCallback(() => {
    loadMore(images.at(-1)?.id);
  }, [images, loadMore]);

  useEffect(() => {
    loadMore();
  }, [loadMore]);

  useEffect(() => {
    window.addEventListener('images-uploaded', refresh);

    return () => {
      window.removeEventListener('images-uploaded', refresh);
    };
  }, [refresh]);

  const handleLoadMore = () => {
    loadMore(images.at(-1)?.id);
  };

  const handleDelete = (image: ImageDto) => {
    if (window.confirm('Naozaj chcete vymazať fotku?')) {
      fetch(`/api/images-delete?id=${image.id}`, {
        method: 'DELETE',
      }).then(() => {
        deleteImageById(image.id);
      });
    }
  };

  return (
    <div>
      <h2 id="galeria">Galéria</h2>
      <div className="gallery__items">
        {images.map((image) => (
          <div key={image.id} className="img-delete-wrapper">
            <ClientGalleryImage image={image} />
            <button onClick={() => handleDelete(image)}>Vymazať</button>
          </div>
        ))}
      </div>
      <button onClick={handleLoadMore}>Ďalšie fotky</button>
    </div>
  );
};
