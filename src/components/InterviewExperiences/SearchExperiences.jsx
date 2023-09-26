/* eslint-disable */
import React, { useEffect, useState } from "react";
import useLoading from "../../hooks/useLoading";
import { SearchExp } from "../../api/experiences";

const SearchExperiences = ({setInterviewExperiences}) => {
  const { loading, setLoading } = useLoading();
  const [query, setQuery] = useState("Company");
  const [search,setSearch] = useState("");
    useEffect(() => {
      setLoading(true);
      if(query != "Company"){
        SearchExp(query).then((results)=>{
            setInterviewExperiences(results);
            setLoading(false);
        })
      }else{
        setLoading(false);
      }
    }, [query])

    const submitHandler = () => {
      setQuery(search);
    }
    
    const companies = ["Company","Microsoft", "Adobe", "Wells Fargo", "BNY", "Texas Instruments", "Oracle","JP Morgan"];
    const rounds = ["Round","1","2","3"];
  return (
    <div className="w-full mt-4 mb-4 flex justify-between">
        <div className="flex w-1/2 justify-start ml-0 mr-3">
          <input className="h-9 w-full outline-none me-2 border-outline rounded-lg ps-3 pe-2 text-onSurface" onChange={(e)=>{setSearch(e.target.value)}} placeholder="Search by title" />
          <button className="h-9 w-1/6 bg-primary text-onPrimary rounded-lg font-alt p-1 font-semibold" onClick={submitHandler}>Search</button>
        </div>
        <div className="flex w-1/2 justify-end">
          <select onChange={(e)=>setQuery(e.target.value)} value={query} className="h-9 w-2/6 me-2 border-outline rounded-lg ps-3 pe-2">
              {companies.map((company,idx)=>{
                  return(
                    <option key={idx} value={company}>{company}</option>
                  );
              })}
          </select>
          <select className="h-9 w-2/6 rounded-lg ps-3 pe-2">
              {rounds.map((round,idx)=>{
                return(
                  <option key={idx} value={round}>{round}</option>
                );
              })}
          </select>
        </div>
    </div>
  )
};

export default SearchExperiences;
