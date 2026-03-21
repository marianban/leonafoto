'use client';

import React, { useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Album } from './Album';

export const AlbumContainer = () => {
  const [open, setOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const handleOnClose = () => {
    setOpen(false);
  };

  useLayoutEffect(() => {
    const handleOpen = (event: Event) => {
      setOpen(true);
      if (event.type === 'open-album') {
        setImageIndex((event as CustomEvent).detail);
        return;
      }

      setImageIndex(Number((event.target as HTMLElement).dataset.imageIndex));
    };

    const serverImages = document.querySelectorAll('[data-image-index]');
    serverImages.forEach((image) => {
      image.addEventListener('click', handleOpen);
    });

    window.addEventListener('open-album', handleOpen);

    return () => {
      serverImages.forEach((image) => {
        image.removeEventListener('click', handleOpen);
      });
      window.removeEventListener('open-album', handleOpen);
    };
  }, []);

  if (!open) {
    return null;
  }

  const portalRoot = document.querySelector<HTMLElement>('#modal-root');

  if (!portalRoot) {
    return null;
  }

  return createPortal(
    <div className="modal-container">
      <Album onClose={handleOnClose} imageIndex={imageIndex} />
    </div>,
    portalRoot,
  );
};
