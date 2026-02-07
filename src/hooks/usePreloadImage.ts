import { useEffect, useState } from 'react';

export const usePreloadImage = (src: string): boolean => {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setLoaded(true);
    img.onerror = () => setLoaded(true); // Continue even if error
  }, [src]);
  
  return loaded;
};
