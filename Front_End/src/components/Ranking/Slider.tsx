import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Slider.css";
import { Link } from "react-router-dom";
export default function Slider() {
  return (
    <React.Fragment>
      <Carousel
        autoPlay
        stopOnHover
        showStatus={true}
        showThumbs={false}
        infiniteLoop={true}
        useKeyboardArrows={true}
        transitionTime={2}
      >
        <a href="http://www.siwse.com/" className="img1_a">
          <img
            src="https://scontent-ssn1-1.xx.fbcdn.net/v/t1.0-9/70443213_2998231686870304_612181870750203904_n.jpg?_nc_cat=106&_nc_ohc=1rlzQh6oNlwAX-UAYND&_nc_ht=scontent-ssn1-1.xx&oh=3e117e86ce76f5e31dbe78bf19c71b2f&oe=5EF99743"
            className="img1"
          ></img>
        </a>
        <a href="http://ksommguild.com/" className="img1_b">
          <img
            src="https://scontent-ssn1-1.xx.fbcdn.net/v/t1.0-9/70938658_2864545653557457_6010099852149522432_o.jpg?_nc_cat=101&_nc_ohc=aaw0wuSR_LEAX-JiyYi&_nc_ht=scontent-ssn1-1.xx&oh=92a831c9d8aedadad486de91d2e5b51b&oe=5EBABFCE"
            className="img1"
          />
        </a>
        <a
          href="https://www.scc.or.kr/scc_event/%EA%B2%9F%EC%9E%87%EC%87%BC-%EC%88%98%EC%9B%90-2020-%EC%9B%94%EB%93%9C%EC%8B%9D%ED%92%88%C2%B7%EC%99%80%EC%9D%B8-%EB%B0%8F-%EC%A3%BC%EB%A5%98-%EB%B0%95%EB%9E%8C%ED%9A%8C/"
          className="img1_c"
        >
          <img
            src="https://scontent-ssn1-1.xx.fbcdn.net/v/t1.0-9/81964717_628845561197886_9003042224614670336_o.jpg?_nc_cat=108&_nc_ohc=cU2C17P4Uj0AX_6PWzq&_nc_ht=scontent-ssn1-1.xx&oh=f2669ba92150c22fbfc7b94d63f8e321&oe=5F0216D3"
            alt=""
            className="img1"
          />
        </a>
      </Carousel>
    </React.Fragment>
  );
}
