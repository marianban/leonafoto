'use client';

import React, { useState, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { Album } from './Album';

export const AlbumContainer = () => {
  const [open, setOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const portalRoot =
    typeof document === 'undefined'
      ? null
      : document.querySelector<HTMLElement>('#modal-root');

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

  return portalRoot
    ? createPortal(
        <div>
          {open && (
            <div className="modal-container">
              <Album onClose={handleOnClose} imageIndex={imageIndex} />
            </div>
          )}
        </div>,
        portalRoot
      )
    : null;
};
