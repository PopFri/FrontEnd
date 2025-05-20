// src/RouteChangeTracker.js
import { useMatomo } from '@datapunt/matomo-tracker-react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const RouteChangeTracker = () => {
  const { trackPageView } = useMatomo();
  const location = useLocation();

  useEffect(() => {
    trackPageView();
  }, [location]);

  return null;
};