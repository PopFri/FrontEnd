import { useMatomo } from '@datapunt/matomo-tracker-react';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export const RouteChangeTracker = () => {
  const location = useLocation();
  const { trackPageView } = useMatomo();

  useEffect(() => {
    trackPageView(); // 경로 바뀔 때마다 Matomo에 페이지뷰 기록
  }, [location]);

  return null;
};