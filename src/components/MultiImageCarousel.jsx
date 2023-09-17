import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./carousel.css";

const MultiImageCarousel = ({ images }) => {
  return (
    <Carousel
      className="lg:w-1/2 w-full"
      showThumbs={false}
      autoPlay={true}
      stopOnHover={true}
      useKeyboardArrows={true}
    >
      {images.map((image, index) => (
        <div key={index} className="cursor-pointer w-fit mx-auto hover:scale-125 border-4 duration-200 ease-in-out z-20">
          <img className="max-h-[80vh] object-contain cursor-pointer z-20" src={image} alt={`Image ${index}`} />
        </div>
      ))}
    </Carousel>
  );
};

export default MultiImageCarousel;
