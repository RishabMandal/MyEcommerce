import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const MultiImageCarousel = ({ images }) => {
  return (
    <Carousel
      className="lg:w-1/2 w-full lg:h-auto object-contain object-center rounded cursor-pointer hover:scale-125 duration-200 ease-in-out"
      showThumbs={false}
      autoPlay={true}
      stopOnHover={true}
      useKeyboardArrows={true}
    >
      {images.map((image, index) => (
        <div key={index}>
          <img src={image} alt={`Image ${index}`} />
        </div>
      ))}
    </Carousel>
  );
};

export default MultiImageCarousel;
