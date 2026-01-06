import { MutableRefObject, useCallback, useRef, useState } from 'react';
import type { Image } from './types';

interface Response {
  images: string[];
}

const buildUrl = (size: number, excluded: string[]) => {
  const urlParams = new URLSearchParams();
  urlParams.append('size', size.toString());
  for (const exclude of excluded) {
    urlParams.append('excluded', exclude);
  }
  return `/api/random-images?${urlParams.toString()}`;
};

export const useRandomImages = ({
  lastIdRef,
}: {
  lastIdRef: MutableRefObject<number>;
}) => {
  const abortControllerRef = useRef<AbortController>();
  const [isLoading, setIsLoading] = useState(false);

  const loadMore = useCallback(
    ({
      size,
      excluded,
    }: {
      size: number;
      excluded: string[];
    }): Promise<Omit<Image, 'left'>[]> => {
      setIsLoading(true);
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();
      const signal = abortControllerRef.current.signal;

      return fetch(buildUrl(size, excluded), { signal })
        .then((res) => res.json())
        .then((response: Response) => {
          return response.images.map((src) => {
            const id = ++lastIdRef.current;
            return { id, src, loading: false };
          });
        })
        .catch((err) => {
          if (err.name === 'AbortError') {
            return [];
          }
          throw err;
        })
        .finally(() => setIsLoading(false));
    },
    [setIsLoading, lastIdRef]
  );

  const abort = useCallback(() => {
    abortControllerRef.current?.abort();
  }, []);

  return { loadMore, abort, isLoading };
};
