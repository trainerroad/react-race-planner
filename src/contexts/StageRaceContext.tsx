import { createContext } from "react";

interface IStageRaceContext {}

const StageRaceContext = createContext<IStageRaceContext>({});

export const StageRaceProvider: React.FC = ({ children }) => {
  return (
    <StageRaceContext.Provider value={{}}>{children}</StageRaceContext.Provider>
  );
};
