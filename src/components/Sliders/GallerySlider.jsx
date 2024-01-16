import React, { useEffect, useRef } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";

export default function GallerySlider({ slides }) {
  const mainRef = useRef(null);
  const thumbsRef = useRef(null);

  useEffect(() => {
    if (mainRef.current && thumbsRef.current && thumbsRef.current.splide) {
      mainRef.current.sync(thumbsRef.current.splide);
    }
  }, []);

  const renderSlides = () => {
    return slides.map((slide) => (
      <SplideSlide key={slide.public_id}>
        <img
          src={slide.secure_url}
          alt={slide.filename}
          className="rounded-md object-cover w-full h-full"
        />
      </SplideSlide>
    ));
  };

  const mainOptions = {
    type: "loop",
    perPage: 1,
    perMove: 1,
    pagination: false,
    height: "24rem",
  };

  const thumbsOptions = {
    type: "slide",
    rewind: true,
    gap: "1rem",
    pagination: false,
    fixedWidth: 110,
    fixedHeight: 70,
    arrows: false,
    cover: true,
    focus: "center",
    isNavigation: true,
  };

  return (
    <div className="wrapper relative">
      <Splide
        options={mainOptions}
        ref={mainRef}
        aria-labelledby="thumbnail-slider-example"
      >
        {renderSlides()}
      </Splide>
      <div className="bg-neutral-950/50 absolute w-full bottom-0 rounded-md">
        <Splide
          options={thumbsOptions}
          ref={thumbsRef}
          aria-label="The carousel with thumbnails. Selecting a thumbnail will change the main carousel"
        >
          {renderSlides()}
        </Splide>
      </div>
    </div>
  );
}
