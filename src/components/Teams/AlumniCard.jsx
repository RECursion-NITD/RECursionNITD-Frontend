//AlumniCard
import { FaLinkedin } from "react-icons/fa";

const AlumniCard = ({ alumni }) => (
  <div className="flex w-full sm:w-[300px] md:w-[400px] h-[160px] m-2 overflow-hidden border border-white rounded-lg bg-white bg-opacity-20 hover:scale-105 transition-transform ease-in-out duration-300 shadow-md">
    <img
      src={alumni.image}
      alt={alumni.name}
      className="object-cover w-1/3 sm:w-1/2 h-full"
    />
    <div className="w-2/3 sm:w-3/5 p-2 sm:p-3 flex flex-col justify-center space-y-1">
      <h2 className="text-sm sm:text-lg text-white font-mulish font-semibold">
        {alumni.name}
      </h2>

      <p className="text-base sm:text-lg text-white">
        B.Tech. in {alumni.branch}
      </p>

      <a
        href={alumni.url_LinkedIn}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 text-xs sm:text-sm flex items-center hover:text-blue-400"
      >
        <FaLinkedin className="ml-7" />
        <span>LinkedIn Profile</span>
      </a>
    </div>
  </div>
);

export default AlumniCard;