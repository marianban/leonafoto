import { useCallback, useRef, useState } from 'react';
import { ImageDto } from '../../../pages/api/ImageDto';

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
  const [inProgress, setInProgress] = useState(false);
  const abortControllerRef = useRef<AbortController>();

  const loadMore = useCallback(
    (prevImageId?: number) => {
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();
      const url = buildUrl(size ?? 10, prevImageId);
      const signal = abortControllerRef.current.signal;
      setInProgress(true);
      fetch(url, { signal })
        .then((res) => res.json())
        .then((response: Response) =>
          setImages((imgs) => [...imgs, ...response.images])
        )
        .finally(() => setInProgress(false));
    },
    [size, abortControllerRef]
  );

  const abort = useCallback(() => {
    abortControllerRef.current?.abort();
  }, []);

  return { images, loadMore, abort, inProgress };
};
