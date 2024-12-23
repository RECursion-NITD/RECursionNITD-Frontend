import { useEffect, useState, useRef } from "react";
import { getTeam, getAlumni } from "../../api/team";
import useLoading from "../../hooks/useLoading";
import Loader from "../Loader";
import AlumniCard from "./AlumniCard";
import TeamMember from "./MemberCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import teamImage from "../../assets/images/team1.png";
import vec from "../../assets/images/Vector.png";

const Team = () => {
  const { loading, setLoading } = useLoading();
  const scrollContainerRef = useRef(null);
  const [alumni, setAlumni] = useState(null);
  const [alumniYear, setAlumniYear] = useState(2023);
  const [team, setTeam] = useState(null);

  let yearSet = [];
  const currYear = new Date().getFullYear();
  for (let year = currYear; year >= 2016; year--) yearSet.push(year);

  const scroll = (direction) => {
    const scrollDistance = 530;
    if (scrollContainerRef.current) {
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      scrollContainerRef.current.scrollTo({
        left:
          scrollLeft +
          (direction === "left" ? -scrollDistance : scrollDistance),
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    setLoading(true);
    getAlumni(alumniYear).then((data) => {
      setAlumni(data);
      setLoading(false);
    });
  }, [alumniYear]);

  useEffect(() => {
    setLoading(true);
    getTeam().then((data) => {
      setTeam(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="bg-black w-full overflow-hidden py-10 px-4 sm:px-6 md:px-10">
      {loading && <Loader />}

      {/* TEAM HEADER */}
      <div
        className="text-center bg-cover mt-4 bg-center bg-fixed w-full h-[70vh] sm:h-[80vh] lg:h-[100vh] opacity-80 flex items-center justify-center"
        style={{
          backgroundImage: `url(${teamImage})`,
        }}
      >
        <h1 className="text-4xl md:text-5xl lg:text-9xl sm:text-[5rem] font-bold text-white">
          MEET OUR
          <br />
          TEAM
        </h1>
      </div>

      {/* Team Members Section */}
      {team &&
        Object.keys(team).map((year, i) => (
          <div key={i} className="mb-10">
            <div className="flex items-center justify-center my-8">
              <hr className="flex-grow border-gray-300" />
              <h2 className="text-2xl font-bold mx-4 text-[#58CDFF]">
                Batch of {year}
              </h2>
              <hr className="flex-grow border-gray-300" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {team[year].map((member, id) => (
                <TeamMember key={id} member={member} />
              ))}
            </div>
          </div>
        ))}

      {/* OUR TEAM BUTTON */}
      {/* OUR TEAM BUTTON */}
      <div className="flex justify-center mt-10">
        <button
          onClick={() => {
            // Scroll to top or any specific functionality you need
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center text-white bg-[#58CDFF] px-6 py-2 rounded-lg font-bold hover:bg-[#2b8bb5] transition-transform"
        >
          <span className="mr-2">OUR ALUMNI</span>
          <img src={vec} alt="Vector Icon" className="w-4 h-4" />
        </button>
      </div>

      {/* ALUMNI SECTION */}
      <div className="mt-20 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#58CDFF] mb-7">
          MEET OUR ALUMNI
        </h1>

        <div className="flex items-center justify-center w-3/4 mx-auto bg-white py-3 h-16 rounded-2xl relative">
          <button
            onClick={() => scroll("left")}
            className="w-10 h-10 rounded-full bg-[#58CDFF] flex items-center justify-center hover:bg-[#2b8bb5] transition-transform"
            style={{ position: "absolute", left: "10px", bottom: "13px" }}
          >
            <FaArrowLeft className="text-white" />
          </button>
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-scroll whitespace-nowrap w-full mx-4 scrollbar-hide"
          >
            {yearSet.map((year) => (
              <div
                key={year}
                className="flex-shrink-0 w-1/4 px-2 sm:px-4 text-center cursor-pointer"
                onClick={() => {
                  if (alumniYear === year) return;
                  setAlumni(null);
                  setAlumniYear(year);
                }}
              >
                <span
                  className={`text-sm sm:text-lg font-semibold ${
                    alumniYear === year ? "text-black" : "text-gray-600"
                  }`}
                >
                  Batch of {year}
                </span>
              </div>
            ))}
          </div>
          <button
            onClick={() => scroll("right")}
            className="w-10 h-10 rounded-full bg-[#58CDFF] flex items-center justify-center hover:bg-[#2b8bb5] transition-transform"
            style={{ position: "absolute", right: "10px", bottom: "13px" }}
          >
            <FaArrowRight className="text-white" />
          </button>
        </div>

        <div className="text-center mt-10">
          <h2 className="text-2xl font-bold text-[#58CDFF]">
            Batch of {alumniYear}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            {alumni?.map((alumniMember, id) => (
              <AlumniCard key={id} alumni={alumniMember} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
