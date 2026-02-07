import { useEffect, useState } from 'react';

interface PWAStatus {
  needRefresh: boolean;
  offlineReady: boolean;
  updateServiceWorker: () => void;
}

export const usePWA = (): PWAStatus => {
  const [needRefresh, setNeedRefresh] = useState(false);
  const [offlineReady, setOfflineReady] = useState(false);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      // Register service worker update listener
      const handleSWUpdate = (event: Event) => {
        const customEvent = event as CustomEvent;
        if (customEvent.detail) {
          setNeedRefresh(true);
        }
      };

      window.addEventListener('sw-update', handleSWUpdate);

      // Check if already cached/offline ready
      navigator.serviceWorker.ready.then(() => {
        setOfflineReady(true);
      });

      return () => {
        window.removeEventListener('sw-update', handleSWUpdate);
      };
    }
  }, []);

  const updateServiceWorker = () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.update();
        setNeedRefresh(false);
      });
    }
  };

  return {
    needRefresh,
    offlineReady,
    updateServiceWorker
  };
};

export default usePWA;
