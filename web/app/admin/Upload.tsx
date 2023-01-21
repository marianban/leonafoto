'use client';

import { useRef, useState } from 'react';
import { Spinner } from './Spinner';

export const Upload = ({ onSuccess }: { onSuccess: () => void }) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleOnDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    setIsUploading(true);
    event.nativeEvent.preventDefault();
    event.preventDefault();

    const formData = new FormData();

    for (const file of event.dataTransfer.files) {
      if (!file.type.endsWith('jpeg') && !file.type.endsWith('jpg')) continue;
      formData.append('images', file);
    }

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
    }
  };

  const handleModalOk = () => {
    modalRef.current?.close();
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
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
      </div>
      <dialog ref={modalRef}>
        <h2>Fotky úspešne nahrané</h2>
        <button onClick={handleModalOk}>OK</button>
      </dialog>
    </>
  );
};
