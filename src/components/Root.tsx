import { StageRaceProvider } from "../contexts";
import App from "./App";

const Root = () => (
  <StageRaceProvider>
    <App />
  </StageRaceProvider>
);

export default Root;
