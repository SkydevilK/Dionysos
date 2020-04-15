import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { withRouter } from "react-router-dom";

const ScrollToTop = ({ children, location: { pathname } } : any) : any => {
     useEffect(() => {
          window.scrollTo(0, 0); }, 
          [pathname]); return children; 
        };

export default withRouter(ScrollToTop);
