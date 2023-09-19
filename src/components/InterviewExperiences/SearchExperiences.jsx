/* eslint-disable */
import React, { useEffect, useState } from "react";
import useLoading from "../../hooks/useLoading";
import { SearchExp } from "../../api/experiences";

const SearchExperiences = ({setInterviewExperiences}) => {
  const { loading, setLoading } = useLoading();
  const [companyName, setCompanyName] = useState("Company");
    useEffect(() => {
      setLoading(true);
      if(companyName != "Company"){
        SearchExp(companyName).then((results)=>{
            setInterviewExperiences(results);
            setLoading(false);
        })
      }else{
        setLoading(false);
      }
    }, [companyName])
    
    const companies = ["Company","Microsoft", "Adobe", "Wells Fargo", "BNY", "Texas Instruments", "Oracle","JP Morgan"];
    const rounds = ["Round","1","2","3"];
  return (
    <div className="w-full mt-4 mb-4 flex justify-start">
        <select onChange={(e)=>setCompanyName(e.target.value)} value={companyName} className="h-9 w-1/6 me-2 border-outline rounded-lg ps-3 pe-2">
            {companies.map((company,idx)=>{
                return(
                  <option key={idx} value={company}>{company}</option>
                );
            })}
        </select>
        <select className="h-9 w-1/6 rounded-lg ps-3 pe-2">
            {rounds.map((round,idx)=>{
              return(
                <option key={idx} value={round}>{round}</option>
              );
            })}
        </select>
    </div>
  )
};

export default SearchExperiences;
