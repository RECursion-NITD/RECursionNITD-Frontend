import React from "react";
import Slider from "react-slick";
import { Box, Image } from "@chakra-ui/react";
import msLogo from "../assets/images/ms-logo.png";
import profile from "../assets/images/profile.png";
import homepage from "../assets/images/homepageCodeSnippet.png";
import pic from "../assets/images/keyboardBg.jpg";

const ImageCarousel = () => {
  const settings = {
    dots: true,
    customPaging: function (i) {
      const defaultColor = "white";
      const activeColor = "teal.300";
      const color = i ? activeColor : defaultColor;
      return (
        <Box
          as="span"
          key={i}
          _before={{
            content: "''",
            display: "inline-block",
            height: "10px",
            width: "10px",
            borderRadius: "50%",
            backgroundColor: color,
          }}
        />
      );
    },
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const images = [profile, msLogo, homepage, pic];

  return (
    <Slider {...settings}>
      {images.map((image, index) => (
        <Box key={index} p={0}>
          <Image
            src={image}
            alt={`Image ${index}`}
            minHeight={200}
            // width={200}
          />
        </Box>
      ))}
    </Slider>
  );
};

export default ImageCarousel;
