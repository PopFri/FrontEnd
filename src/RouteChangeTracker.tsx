import { useMatomo } from '@datapunt/matomo-tracker-react';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export const RouteChangeTracker = () => {
  const location = useLocation();
  const { trackPageView } = useMatomo();

  useEffect(() => {
    trackPageView({
      documentTitle: document.title,
    });

    fetch("/matomo.access", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event: "pageview",
        page: window.location.pathname,
        timestamp: new Date().toISOString()
      })
    });
  }, [location]);

  return null;
};