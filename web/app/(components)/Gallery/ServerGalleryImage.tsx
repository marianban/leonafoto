import Image from 'next/image';

export const ServerGalleryImage = ({ image }: { image: ImageDto }) => {
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
