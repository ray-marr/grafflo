import { useEffect, useState } from "react";

export const useWindowDimensions = () => {
  const [windowWidth, setWindowWidth] = useState(800);
  const [windowHeight, setWindowHeight] = useState(800);

  useEffect(() => {
    const updateDimensions = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
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
