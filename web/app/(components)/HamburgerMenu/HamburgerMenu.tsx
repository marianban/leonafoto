'use client';
import { useEffect, useRef } from 'react';
import { Bars } from '../icons/Bars';
import './HamburgerMenu.css';

export const HamburgerMenu = () => {
  const menuIconRef = useRef<HTMLDivElement>(null);
  const toggleMenu = () => {
    const menu = document.querySelector('menu');
    menu?.classList.toggle('active');
  };

  useEffect(() => {
    const closeMenu = () => {
      const menu = document.querySelector('menu');
      menu?.classList.remove('active');
    };

    const closeIfClickedOutside = (event: MouseEvent) => {
      const menu = document.querySelector('menu');
      if (
        !menu?.contains(event.target as Node) &&
        !menuIconRef.current?.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };

    const menu = document.querySelectorAll('menu li');
    for (let item of menu) {
      item.addEventListener('click', closeMenu);
    }

    document.addEventListener('click', closeIfClickedOutside);

    return () => {
      for (let item of menu) {
        item.removeEventListener('click', closeMenu);
      }
      document.removeEventListener('click', closeIfClickedOutside);
    };
  }, []);

  return (
    <div className="hamburger-menu-icon" ref={menuIconRef}>
      <Bars onClick={toggleMenu} />
    </div>
  );
};
