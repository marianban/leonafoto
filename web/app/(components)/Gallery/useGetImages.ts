import { useCallback, useRef, useState } from 'react';

interface Response {
  images: ImageDto[];
}

const buildUrl = (size: number, prevImageId?: number) => {
  const urlParams = new URLSearchParams();
  urlParams.append('size', size.toString());
  if (prevImageId) {
    urlParams.append('cursor', prevImageId.toString());
  }
  return `/api/images?${urlParams.toString()}`;
};

export const useGetImages = ({ size }: { size?: number } = {}) => {
  const [images, setImages] = useState<ImageDto[]>([]);
  const abortControllerRef = useRef<AbortController>();

  const loadMore = useCallback(
    (prevImageId?: number) => {
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();
      const url = buildUrl(size ?? 10, images.at(-1)?.id ?? prevImageId);
      const signal = abortControllerRef.current.signal;
      fetch(url, { signal })
        .then((res) => res.json())
        .then((response: Response) =>
          setImages([...images, ...response.images])
        );
    },
    [size, images, abortControllerRef]
  );

  return { images, loadMore };
};
