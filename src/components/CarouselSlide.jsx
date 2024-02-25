import React, { useState, useEffect } from "react";
import {
  Activit1,
  Activit2,
  Activit3,
  Activit4,
  Activit5,
  Activit6,
  Activit7,
  Activit8,
} from "./Take";
import "../App.css";

const CarouselSlide = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    Activit1,
    Activit2,
    Activit3,
    Activit4,
    Activit5,
    Activit6,
    Activit7,
    Activit8,
  ];

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
    );
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const slideInterval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div className="carousel-container">
      <div className="carousel">
        <button onClick={prevSlide}>&#11160;</button>
        <li key={slides[currentSlide][0].id} style={{ listStyle: "none" }}>
          <img
            loading="lazy"
            src={slides[currentSlide][0].logo}
            alt="logo"
            style={{
              width: "200px",
              height: "150px",
            }}
            className="border border-solid border-teal-200 rounded-lg"
          />
          <br />
          <h4 style={{ fontSize: 17 }}>{slides[currentSlide][0].text}</h4>
        </li>
        <button onClick={nextSlide}>&#11162;</button>
      </div>
      <div className="navigation-buttons">
        {slides.map((_, index) => (
          <button
            className={index === currentSlide ? "active" : ""}
            key={index}
            onClick={() => goToSlide(index)}
          >
            &bull;
          </button>
        ))}
      </div>
    </div>
  );
};

export default CarouselSlide;
