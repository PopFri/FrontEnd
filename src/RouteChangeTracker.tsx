import { useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { useMatomo } from '@datapunt/matomo-tracker-react';

export const RouteChangeTracker = () => {
  const location = useLocation();
  const { trackPageView } = useMatomo();

  const previousPageRef = useRef<string | null>(null);
  const enterTimeRef = useRef(Date.now());

  // 💡 페이지 언로드(창 닫기, 새로고침 등) 시 sendBeacon 사용
  useEffect(() => {
    const handleUnload = () => {
      const leaveTime = Date.now();
      const duration = Math.round((leaveTime - enterTimeRef.current) / 1000);

      const payload = {
        event: "page_leave",
        page: previousPageRef.current ?? location.pathname,
        duration: duration,
        leftAt: new Date().toISOString()
      };

      navigator.sendBeacon(
        "/matomo.access",
        new Blob([JSON.stringify(payload)], { type: "application/json" })
      );
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [location]);

  // 💡 페이지 이동 시 fetch 사용
  useEffect(() => {
    const leaveTime = Date.now();
    const duration = Math.round((leaveTime - enterTimeRef.current) / 1000);

    if (previousPageRef.current !== null) {
      fetch("/matomo.access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: "page_leave",
          page: previousPageRef.current,
          duration: duration,
          leftAt: new Date().toISOString()
        })
      });
    }

    previousPageRef.current = location.pathname;
    enterTimeRef.current = Date.now();

    // Matomo 페이지 뷰 트래킹
    trackPageView({
      documentTitle: document.title,
    });

    fetch("/matomo.access", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: "pageview",
        page: location.pathname,
        timestamp: new Date().toISOString()
      })
    });
  }, [location]);

  return null;
};