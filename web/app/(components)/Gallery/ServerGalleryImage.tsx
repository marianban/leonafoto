import Image from 'next/image';
import { ImageDto } from '../../../pages/api/ImageDto';
import { GalleryItemContainer } from './GalleryItemContainer';
import { galleryImage } from '../galleryImage';

export const ServerGalleryImage = ({
  image,
  index,
}: {
  image: ImageDto;
  index: number;
}) => {
  const isPortrait = image.width < image.height;
  const resizeFactor = isPortrait ? 0.5 : 1;
  const resize = (size: number) => Math.round(size * resizeFactor);

  return (
    <GalleryItemContainer image={image}>
      <picture
        className="gallery__item"
        style={{
          width: isPortrait ? 'calc(50% - 1rem)' : undefined,
          aspectRatio: `${image.width}/${image.height}`,
        }}
      >
        <Image
          src={galleryImage(image.name)}
          alt={image.name}
          fill={true}
          sizes={`(max-width: 734px) ${resize(
            100
          )}vw, (max-width: 1054px) ${resize(
            44
          )}vw, (max-width: 1340px) ${resize(30)}vw, ${resize(300)}px`}
          data-image-index={index}
        />
      </picture>
    </GalleryItemContainer>
  );
};
