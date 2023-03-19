import './Gallery.css';

import { getImagesByCursor } from '../../../pages/api/images';
import { ServerGalleryImage } from './ServerGalleryImage';
import { GalleryNextImages } from './GalleryNextImages';
import { AlbumContainer } from './AlbumContainer';

export const Gallery = async () => {
  const images = await getImagesByCursor(12);
  return (
    <section className="gallery">
      <div className="content">
        <h2 id="galeria">Galéria</h2>
        <div className="gallery__items">
          {images.map((image, index) => (
            <ServerGalleryImage key={image.id} image={image} index={index} />
          ))}
          <GalleryNextImages
            prevImageId={images.at(-1)?.id}
            startIndex={images.length}
          />
        </div>
      </div>
      <AlbumContainer />
    </section>
  );
};
