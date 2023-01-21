import { useCallback, useEffect, useRef } from 'react';

export const useAnimationFrame = (callback: (delta: number) => void) => {
  const animateRef = useRef<number>(0);
  const prevTimeRef = useRef(new Date().getTime());
  const animate = useCallback(() => {
    const now = new Date().getTime();
    const delta = now - prevTimeRef.current;
    prevTimeRef.current = now;

    callback(delta);

    animateRef.current = window.requestAnimationFrame(animate);
  }, [callback]);

  useEffect(() => {
    console.log('effect');
    animate();

    return () => {
      cancelAnimationFrame(animateRef.current);
    };
  }, [animate]);
};
