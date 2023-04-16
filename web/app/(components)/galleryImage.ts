export const galleryImage = (imageName: string) => {
  return `${process.env.IMAGES_DOMAIN ?? ''}/gallery/${imageName}`;
};
