'use client';

import Image, { StaticImageData } from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import '../(components)/Gallery/Gallery.css';

const GalleryImage = ({ image }: { image: ImageDto }) => {
  const isPortrait = image.width < image.height;
  const resizeFactor = isPortrait ? 0.5 : 1;
  const resize = (size: number) => Math.round(size * resizeFactor);
  return (
    <div className="gallery-item-container">
      <picture
        className="gallery__item"
        style={{
          width: isPortrait ? 'calc(50% - 1rem)' : undefined,
          aspectRatio: `${image.width}/${image.height}`,
        }}
      >
        <Image
          src={`/gallery/${image.name}`}
          alt={image.name}
          fill={true}
          sizes={`(max-width: 734px) ${resize(
            100
          )}vw, (max-width: 1054px) ${resize(
            44
          )}vw, (max-width: 1340px) ${resize(30)}vw, ${resize(300)}px`}
        />
      </picture>
    </div>
  );
};

interface Response {
  images: ImageDto[];
}

const useGetImages = () => {
  const [images, setImages] = useState<ImageDto[]>([]);

  const fetchImages = useCallback(() => {
    fetch(`/api/images?size=10`)
      .then((res) => res.json())
      .then((response: Response) => setImages(response.images));
  }, []);

  useEffect(() => {
    fetchImages();
    window.addEventListener('images-uploaded', fetchImages);

    return () => {
      window.removeEventListener('images-uploaded', fetchImages);
    };
  }, [fetchImages]);

  const loadMore = useCallback(() => {
    fetch(`/api/images?size=10&cursor=${images.at(-1)?.id}`)
      .then((res) => res.json())
      .then((response: Response) => setImages([...images, ...response.images]));
  }, [images]);

  return { images, loadMore };
};

export const Images = () => {
  const { images, loadMore } = useGetImages();

  const handleLoadMore = () => {
    loadMore();
  };

  return (
    <div>
      <h2 id="galeria">Galéria</h2>
      <div className="gallery__items">
        {images.map((image) => (
          <GalleryImage key={image.id} image={image} />
        ))}
      </div>
      <button onClick={handleLoadMore}>Load more</button>
    </div>
  );
};
