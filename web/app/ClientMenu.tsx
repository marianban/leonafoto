'use client';

import { useLayoutEffect } from 'react';

export const ClientMenu = () => {
  useLayoutEffect(() => {
    const menu = document.querySelector('menu');
    if (!menu) return;
    const menuItems = menu.querySelectorAll('li');
    const sections = document.querySelectorAll('section');

    const handleScroll = () => {
      const fromTop = window.scrollY - 100;

      sections.forEach((section, index) => {
        if (
          section.offsetTop <= fromTop &&
          section.offsetTop + section.offsetHeight > fromTop
        ) {
          menuItems.forEach((item) => {
            item.classList.remove('active');
          });

          menuItems[index].classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return null;
};
