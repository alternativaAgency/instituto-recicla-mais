import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768;

/**
 * Hook to detect if the current viewport is mobile-sized.
 * 
 * @returns {boolean} True if viewport width is less than MOBILE_BREAKPOINT (768px)
 * 
 * @example
 * const isMobile = useIsMobile();
 * return isMobile ? <MobileComponent /> : <DesktopComponent />;
 * 
 * @note Prefer Tailwind's responsive utilities (md:, lg:) for styling.
 * Only use this hook when you need JavaScript logic based on screen size.
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // Use matchMedia for better performance and consistency
    const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    // Handler function
    const handleChange = (event: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(event.matches);
    };

    // Set initial value (use matches property for consistency)
    setIsMobile(mediaQuery.matches);

    // Modern browsers: use addEventListener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  return isMobile;
}

