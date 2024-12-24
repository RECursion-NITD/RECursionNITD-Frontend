import React, { useState, useEffect } from "react";
import Codingclasses from "../assets/images/Codingclasses.jpg";
import ama from "../assets/images/AMMA.jpg";
import rechase from "../assets/images/rechase.jpg";

const CarouselWithContent = () => {
  const [activeIndex, setActiveIndex] = useState(0); // State for active index

  // Array of slide objects containing images, headers, and descriptions
  const slides = [
    {
      image: Codingclasses,
      header: "Coding Classes",
      description:
        "Dive into the world of programming with our dynamic and interactive coding classes! Whether you're a complete beginner or looking to advance your skills, our classes are designed to cater to all levels.",
    },
    {
      image: ama,
      header: "Ask Me Anything (AMA)",
      description:
        "Ask Me Anything (AMA) is an interactive session with our esteemed alumni for career-related tips and advice.",
    },
    {
      image: rechase,
      header: "REChase",
      description:
        "Annual treasure hunt competition which involves solving riddles and reaching the various locations inside the campus",
    },
    {
      image: Codingclasses,
      header: "RECode",
      description:
        "Put your coding skills to the test in our monthly RECode contest where programmers of all levels come together to solve challenging problems, showcase their talents, and compete for amazing prizes.",
    },
    {
      image: Codingclasses,
      header: "ICPC",
      description:
        "We offer a range of support programs specifically designed to improve student participation and performance in The International Collegiate Programming Contest, which is an annual multi-tiered competitive programming competition among the universities of the world.",
    },
    {
      image: Codingclasses,
      header: "Alohomora",
      description:
        "Alohomora, an ACM-ICPC style competitive programming contest, where teams from all over the world will be battling against each other to come out at the top and be the best.",
    },
  ];

  // Function to handle next slide
  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  // Function to handle previous slide
  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  // Function to handle dot click
  const handleDotClick = (index) => {
    setActiveIndex(index);
  };

  // Optional: Automatic sliding
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 12000); // Change slide every 12 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="w-full flex justify-center items-center h-screen">
      <div className="relative w-full max-w-[1000px] h-[550px]">
        <div className="relative h-full overflow-hidden rounded-lg">
          {/* Map through slides to create items */}
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                index === activeIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={slide.image}
                className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
                alt={`Slide ${index + 1}`}
              />
              {/* Optional overlay for aesthetics */}
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-99"></div>
            </div>
          ))}
        </div>

        {/* Text overlay */}
        <div className="absolute bottom-20 left-0 right-0 flex justify-center items-center text-white px-4 text-center">
          <div className="flex flex-col items-center space-y-2 sm:space-y-3">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-mullish">
              {slides[activeIndex].header}
            </h2>
            <p className="text-sm sm:text-lg lg:text-xl max-w-xs sm:max-w-md lg:max-w-2xl">
              {slides[activeIndex].description}
            </p>
          </div>
        </div>

        {/* Slider indicators */}
        <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeIndex ? "bg-[#58CDFF] scale-125" : "bg-white"
              }`}
              aria-current={index === activeIndex ? "true" : "false"}
              aria-label={`Slide ${index + 1}`}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>

        {/* Slider controls */}
        <button
          type="button"
          className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer"
          onClick={handlePrev}
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 hover:bg-white-50 focus:ring-4 focus:ring-white">
            <svg
              className="w-4 h-4 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>

        <button
          type="button"
          className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer"
          onClick={handleNext}
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 hover:bg-white-50 focus:ring-4 focus:ring-white">
            <svg
              className="w-4 h-4 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button>
      </div>
    </div>
  );
};

// Default export
export default CarouselWithContent;
