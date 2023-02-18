import { useCallback, useRef, useState } from 'react';

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

export const useRandomImages = () => {
  const abortControllerRef = useRef<AbortController>();
  const [isLoading, setIsLoading] = useState(false);

  const loadMore = useCallback(
    ({ size, excluded }: { size: number; excluded: string[] }) => {
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();
      const signal = abortControllerRef.current.signal;
      setIsLoading(true);
      return fetch(buildUrl(size, excluded), { signal })
        .then((res) => res.json())
        .then((response: Response) => response.images)
        .catch((err) => {
          if (err.name === 'AbortError') {
            return [];
          }
          throw err;
        })
        .finally(() => setIsLoading(false));
    },
    [setIsLoading]
  );

  const abort = useCallback(() => {
    abortControllerRef.current?.abort();
  }, []);

  return { loadMore, abort, isLoading };
};
