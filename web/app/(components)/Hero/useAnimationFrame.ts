import { useLayoutEffect, useRef } from 'react';

export const useAnimationFrame = (callback: (delta: number) => void) => {
  const animateRef = useRef<number | null>(null);
  const prevTimeRef = useRef<number | null>(null);
  const callbackRef = useRef(callback);

  useLayoutEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useLayoutEffect(() => {
    const animate = (time: number) => {
      if (prevTimeRef.current === null) {
        prevTimeRef.current = time;
      }

      const delta = time - prevTimeRef.current;
      prevTimeRef.current = time;
      callbackRef.current(delta);
      animateRef.current = window.requestAnimationFrame(animate);
    };

    animateRef.current = window.requestAnimationFrame(animate);

    return () => {
      if (animateRef.current !== null) {
        cancelAnimationFrame(animateRef.current);
      }
    };
  }, []);
};
