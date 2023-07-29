import { useState, useEffect } from "react";

function useWindowWidth() {
  // initialize with undefined so we can distinguish the first render
  const [windowWidth, setWindowWidth] = useState<number | undefined>();

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window width
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowWidth;
}

export default useWindowWidth;
