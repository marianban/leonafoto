import './Gallery.css';

import { getImagesByCursor } from '../../../pages/api/images';
import { ServerGalleryImage } from './ServerGalleryImage';
import { GalleryNextImages } from './GalleryNextImages';
import { AlbumContainer } from './AlbumContainer';

export const Gallery = async () => {
  const placeholder = process.env.SKIP_GALLERY_PRERENDER === '1';
  const images = placeholder ? [] : await getImagesByCursor(12);
  return (
    <section
      className="gallery"
      data-gallery-placeholder={placeholder ? 'true' : undefined}
    >
      <div className="content">
        <h2 id="galeria">Galéria</h2>
        <p>
          Ukážky fotografií z rôznych druhov fotení, ktoré ponúkam. Prezrite si
          moju prácu a nechajte sa inšpirovať pre vaše vlastné fotenie.
        </p>
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
