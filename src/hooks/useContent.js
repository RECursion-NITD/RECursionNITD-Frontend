/* eslint-disable */
import { useContext } from "react";
import ContentContext from "../context/ContentContext";

const useContent = () => {
  return useContext(ContentContext);
};
export default useContent;
