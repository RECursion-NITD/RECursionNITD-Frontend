import { useEffect, useState } from "react";
import { getTeam } from "../api/team";
import useLoading from "../hooks/useLoading";
import Loader from "./Loader";

const Team = () => {
  const { loading, setLoading } = useLoading();

  const [team, setTeam] = useState();
  useEffect(() => {
    setLoading(true);
    getTeam()
      .then((teamData) => {
        setTeam(teamData);
        setLoading(false);
      })
      .catch((err) => console.err(err));
  }, []);

  return (
    <div>
      {loading && <Loader />}

      <h1>Team Page</h1>

      {team &&
        team?.map((member, id) => (
          <div key={id}>
            <p>{member.name}</p>
            <p>{member.role}</p>
          </div>
        ))}
    </div>
  );
};

export default Team;
