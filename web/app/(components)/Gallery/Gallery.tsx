import imgSrc from './linkavianoce.jpg';
import './Gallery.css';

import { getImagesByCursor } from '../../../pages/api/images';
import { ServerGalleryImage } from './ServerGalleryImage';
import { GalleryNextImages } from './GalleryNextImages';

export const Gallery = async () => {
  const images = await getImagesByCursor(12);
  return (
    <section className="gallery">
      <div className="content">
        <h2 id="galeria">Galéria</h2>
        <div className="gallery__items">
          {images.map((image) => (
            <ServerGalleryImage key={image.id} image={image} />
          ))}
          <GalleryNextImages prevImageId={images.at(-1)?.id} />
        </div>
      </div>
    </section>
  );
};
