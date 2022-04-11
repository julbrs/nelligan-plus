import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    window.goatcounter &&
      window.goatcounter.count &&
      window.goatcounter.count({
        path: location.pathname + location.search,
        // title: "Yellow curvy fruit",
        // event: true,
      });
  }, [location]);
};

export default usePageTracking;
