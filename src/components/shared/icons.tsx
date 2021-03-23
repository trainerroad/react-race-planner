import styled, { keyframes } from "styled-components";
import { FaCircleNotch } from "react-icons/fa";

const spinKeyframes = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(359deg);
  }
`;

export const LoadingSpinner = styled(FaCircleNotch).attrs({
  "aria-label": "Loading...",
})`
  animation: ${spinKeyframes} 2s infinite linear;
  color: gray;
  font-size: 2em;
`;
