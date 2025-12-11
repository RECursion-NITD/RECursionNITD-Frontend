import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/images/Recursion_logo.svg"; // Ensure correct path to the logo

const FlipCard = () => {
  const cardRef = useRef(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [hasFlipped, setHasFlipped] = useState(false); // Track if the card has flipped

  const handleScroll = () => {
    const cardTop = cardRef.current.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    // Trigger flip when card is in the viewport and it hasn't flipped yet
    if (cardTop < windowHeight && cardTop > 0 && !hasFlipped) {
      setIsFlipped(true);
      setHasFlipped(true); // Mark that the card has flipped
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasFlipped]); // Adding hasFlipped to the dependency array

  const cardData = [
    {
      backTitle: "Mission",
      backContent:
        "Working towards the improvement of campus's coding culture by organizing regular coding classes, coding contests, and geeky sessions.",
    },
    {
      backTitle: "Value",
      backContent:
        "We believe that helping each other is the only way. We take care and always look to get the best out of everyone.",
    },
    {
      backTitle: "Vision",
      backContent:
        "To grow as a strong community in the world of coding, to make an impact in various fields and uphold the integrity of NIT Durgapur as a technical institution.",
    },
  ];

  return (
    <>
      <style>{`
        .perspective {
          perspective: 1000px;
        }
        .flip-card-inner {
          transform-style: preserve-3d;
          transition: transform 0.7s ease;
          transition-delay: 0.5s; /* 500ms delay before the flip animation starts */
        }
        .flip-card-front,
        .flip-card-back {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
      `}</style>

      <div className="flex flex-col lg:flex-row justify-center gap-10 lg:gap-5 md:gap-4 mt-8">
        {cardData.map((card, index) => (
          <div ref={cardRef} key={index} className="perspective w-80 h-96">
            <div
              className={`flip-card-inner relative w-full h-full ${
                isFlipped ? "rotate-y-180" : ""
              }`}
            >
              <div
                className="flip-card-front absolute lg:w-7/11 w-full h-full flex flex-col items-center justify-center rounded-lg shadow-lg backface-hidden"
                style={{
                  backgroundColor:
                    index < 3 ? "rgba(41, 41, 41, 0.57)" : "white",
                  color: index < 3 ? "white" : "black",
                }}
              >
                <img src={logo} alt="Logo" className="w-32 h-32" />
                <h2 className="text-xl font-bold"></h2>
              </div>
              <div
                className="flip-card-back absolute lg:w-7/11 w-full h-full text-white flex flex-col items-center rounded-lg shadow-lg rotate-y-180 backface-hidden"
                style={{
                  backgroundColor:
                    index < 3 ? "rgba(41, 41, 41, 0.57)" : "white",
                  color: index < 3 ? "white" : "black",
                }}
              >
                <div className="card-top-content mt-10 mb-0">
                  <h2 className="text-2xl font-bold text-[#8DDDFF]">
                    {card.backTitle}
                  </h2>
                  <svg
                    width="44"
                    height="24"
                    viewBox="0 0 64 34"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mt-5"
                  >
                    <path
                      d="M16.2303 28.52L0.710313 19.64V15.76L16.2303 6.88L18.8703 11.96L5.27031 19.08V16.32L18.8703 23.48L16.2303 28.52ZM20.4059 33.68L37.0459 -1.90735e-06H43.4059L26.8459 33.68H20.4059ZM48.075 28.52L45.475 23.48L59.035 16.32V19.08L45.475 11.96L48.075 6.88L63.595 15.76V19.64L48.075 28.52Z"
                      fill="#8DDDFF"
                    />
                  </svg>
                </div>
                <p className="mt-10 w-9/12 text-l">{card.backContent}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default FlipCard;
