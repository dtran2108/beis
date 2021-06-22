import React, { useLayoutEffect, useState, useEffect } from 'react';
import debounce from 'lodash.debounce';

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}
export { useWindowSize };

/**
 * useScroll React custom hook
 * Usage:
 *    const [scrollX, scrollY] = useScroll();
 */

export function useScroll() {
  const [scrollX, setScrollX] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  function logic() {
    setScrollX(window.pageXOffset);
    setScrollY(window.pageYOffset);
  }

  useEffect(() => {
    function watchScroll() {
      window.addEventListener('scroll', logic);
    }
    watchScroll();
    return () => {
      window.removeEventListener('scroll', logic);
    };
  });

  return [scrollX, scrollY];
}
