import { createContext, useState } from "react";

const LoadingContext = createContext();
export default LoadingContext;

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const contextData = {
    loading,
    setLoading,
  };

  return (
    <LoadingContext.Provider value={contextData}>
      {children}
    </LoadingContext.Provider>
  );
};
