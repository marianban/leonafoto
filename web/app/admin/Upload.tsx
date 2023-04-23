'use client';

import { useRef, useState } from 'react';
import { Spinner } from './Spinner';
import './Upload.css';

export const Upload = () => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [formData, setFormData] = useState<FormData | null>(null);

  const createImagePreviews = (files: FileList) => {
    const imageUrls: string[] = [];

    for (const file of files) {
      if (!file.type.endsWith('jpeg') && !file.type.endsWith('jpg')) continue;
      const url = URL.createObjectURL(file);
      imageUrls.push(url);
    }

    setPreviewImages(imageUrls);
  };

  const handleOnDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.nativeEvent.preventDefault();
    event.preventDefault();

    const newFormData = new FormData();
    createImagePreviews(event.dataTransfer.files);

    for (const file of event.dataTransfer.files) {
      if (!file.type.endsWith('jpeg') && !file.type.endsWith('jpg')) continue;
      newFormData.append('images', file);
    }

    setFormData(newFormData);
  };

  const handleUpload = async () => {
    if (!formData) return;

    setIsUploading(true);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        modalRef.current?.showModal();
        window.dispatchEvent(new Event('images-uploaded'));
      }
    } finally {
      setIsUploading(false);
      setPreviewImages([]);
    }
  };

  const handleModalOk = () => {
    modalRef.current?.close();
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDelete = (index: number) => {
    const newPreviewImages = [...previewImages];
    newPreviewImages.splice(index, 1);
    setPreviewImages(newPreviewImages);
  };

  return (
    <>
      <div
        className="drop-target"
        onDragOver={handleDragOver}
        onDrop={handleOnDrop}
      >
        <div className="drop-target__msg">
          {isUploading ? (
            <>
              Nahrávam fotky...
              <Spinner />
            </>
          ) : (
            <>Presuň fotky sem</>
          )}
        </div>
        <div className="photo-previews">
          {previewImages.map((url, index) => (
            <picture key={index} className="photo-review img-delete-wrapper">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={url}
                alt={`Preview ${index}`}
                className="photo-review"
              />
              <button onClick={() => handleDelete(index)}>Vymazať</button>
            </picture>
          ))}
        </div>
      </div>
      <button onClick={handleUpload} disabled={!formData || isUploading}>
        Nahrať fotky
      </button>
      <dialog ref={modalRef}>
        <h2>Fotky úspešne nahrané</h2>
        <button onClick={handleModalOk}>OK</button>
      </dialog>
    </>
  );
};
