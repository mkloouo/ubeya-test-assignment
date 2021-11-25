import { useEffect, useState } from 'react';

export const useScript = (url: string) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');

    script.src = url;
    script.async = true;

    document.body.appendChild(script);

    setTimeout(() => {
      setLoaded(true);
    }, 1000);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return { loaded };
};
