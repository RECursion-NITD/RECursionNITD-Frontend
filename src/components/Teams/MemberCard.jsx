import { FaFacebook, FaLinkedin, FaPhoneSquare } from "react-icons/fa";

const TeamMember = ({ member }) => (
  <div className="our-team text-center mt-2 w-full sm:w-36 md:w-40">
    <div className="pic shadow-2xl border-2 border-white overflow-hidden w-full h-32 sm:h-36 md:h-40 mx-auto mb-0 relative rounded-lg">
      <img
        src={member.image}
        alt={member.name}
        className="w-full h-full object-cover"
      />

      {/* Social links */}
      <ul className="social-links absolute inset-0 flex justify-center items-center gap-4 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300">
        <li>
          <a
            href={member.url_Facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-2xl hover:text-blue-500"
          >
            <FaFacebook />
          </a>
        </li>

        <li>
          <a
            href={member.url_LinkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-2xl hover:text-blue-400"
          >
            <FaLinkedin />
          </a>
        </li>

        <li>
          <a
            href={`tel:${member.mobile}`}
            className="text-white text-2xl hover:text-green-400"
          >
            <FaPhoneSquare />
          </a>
        </li>
      </ul>
    </div>

    <h3 className="team-title text-base sm:text-lg font-mulish font-semibold text-white">
      {member.name}
    </h3>
    <p className="text-[#58CDFF] text-sm sm:text-base">{member.designation}</p>
  </div>
);

export default TeamMember;
