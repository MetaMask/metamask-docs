import {useCallback, useEffect, useRef, useState} from 'react';
import {useLocationChange} from '@docusaurus/theme-common/internal';

const useCustomHideableNavbar = (hideOnScroll: boolean) => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const navbarRef = useRef<HTMLElement>(null);
  const lastScrollTop = useRef(0);

  const handleScroll = useCallback(() => {
    if (!hideOnScroll) {
      return;
    }

    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollingUp = currentScrollTop < lastScrollTop.current;
    const scrollDifference = Math.abs(currentScrollTop - lastScrollTop.current);
    
    // Show navbar when at the top or scrolling up
    if (currentScrollTop <= 5 || scrollingUp) {
      setIsNavbarVisible(true);
    } 
    // Hide only when scrolling down significantly and past a larger threshold
    else if (currentScrollTop > 100 && scrollDifference > 20) {
      setIsNavbarVisible(false);
    }

    lastScrollTop.current = currentScrollTop;
  }, [hideOnScroll]);

  useLocationChange((locationChangeEvent) => {
    if (!hideOnScroll) {
      return;
    }
    setIsNavbarVisible(true);
    lastScrollTop.current = 0;
  });

  useEffect(() => {
    if (!hideOnScroll) {
      return undefined;
    }

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll, hideOnScroll]);

  return {
    navbarRef,
    isNavbarVisible,
  };
};

export default useCustomHideableNavbar;