/* eslint-disable */
import { createContext, useState } from "react";

const ContentContext = createContext();
export default ContentContext;

export const ContentProvider = ({ children }) => {
  const [levelSelected, setLevelSelected] = useState(0);
  const [topicSelected, setTopicSelected] = useState(0);
  const [contents, setContents] = useState(null);
  const [subTopicSelected, setSubTopicSelected] = useState(21);
  const contextData = {
    levelSelected,
    setLevelSelected,
    topicSelected,
    setTopicSelected,
    contents,
    setContents,
    subTopicSelected,
    setSubTopicSelected,
  };

  return (
    <ContentContext.Provider value={contextData}>
      {children}
    </ContentContext.Provider>
  );
};
