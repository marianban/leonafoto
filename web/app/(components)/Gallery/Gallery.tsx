import imgSrc from './linkavianoce.jpg';
import './Gallery.css';

import Image, { StaticImageData } from 'next/image';

type GalleryItemProps = {
  src: StaticImageData;
};

const GalleryItem = ({ src }: GalleryItemProps) => {
  return (
    <picture className="gallery__item">
      <Image
        src={src}
        alt="Fotka"
        fill={true}
        sizes="(max-width: 734px) 100vw, (max-width: 1054px) 44vw, (max-width: 1340px) 30vw"
      />
    </picture>
  );
};

export const Gallery = () => {
  return (
    <section className="gallery">
      <div className="content">
        <h2 id="galeria">Galéria</h2>
        <div className="gallery__items">
          <GalleryItem src={imgSrc} />
          <GalleryItem src={imgSrc} />
          <GalleryItem src={imgSrc} />
          <GalleryItem src={imgSrc} />
          <GalleryItem src={imgSrc} />
          <GalleryItem src={imgSrc} />
          <GalleryItem src={imgSrc} />
          <GalleryItem src={imgSrc} />
          <GalleryItem src={imgSrc} />
          <GalleryItem src={imgSrc} />
          <GalleryItem src={imgSrc} />
          <GalleryItem src={imgSrc} />
        </div>
      </div>
    </section>
  );
};
