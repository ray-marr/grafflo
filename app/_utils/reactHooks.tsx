"use client";
import { useEffect, useState } from "react";

function isMobileDevice() {
  const userAgent = navigator.userAgent;
  const isMobileUA = userAgent.match(/Mobile|iPhone|Android/i);

  return isMobileUA;
}

export const useWindowDimensions = () => {
  const [windowWidth, setWindowWidth] = useState(800);
  const [windowHeight, setWindowHeight] = useState(800);

  useEffect(() => {
    const updateDimensions = () => {
      const isMobile = isMobileDevice();
      setWindowWidth(isMobile ? window.screen.width : window.innerWidth);
      setWindowHeight(isMobile ? window.screen.height : window.innerHeight);
    };

    updateDimensions();

    window.addEventListener("load", updateDimensions);
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("load", updateDimensions);
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  return { width: windowWidth, height: windowHeight };
};
