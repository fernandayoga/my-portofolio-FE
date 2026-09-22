import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import AOS from "aos";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Reset window and document scroll position immediately upon route change
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Refresh AOS so animations trigger on SPA route transitions
    AOS.refresh();
  }, [pathname]);

  return null;
};

export default ScrollToTop;
