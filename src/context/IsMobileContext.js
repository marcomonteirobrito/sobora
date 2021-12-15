import { createContext, useEffect, useState } from "react";

export const IsMobileContext = createContext({});

export function IsMobileProvider({ children }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    handleIsMobile();
  }, []);

  const handleIsMobile = () => {
    let { innerWidth } = window;

    if (innerWidth < 1024) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  return (
    <IsMobileContext.Provider value={{ isMobile }}>
      {children}
    </IsMobileContext.Provider>
  );
}
