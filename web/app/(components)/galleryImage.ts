export const galleryImage = (imageName: string) => {
  return `${process.env.NEXT_PUBLIC_IMAGES_DOMAIN ?? ''}/gallery/${imageName}`;
};
