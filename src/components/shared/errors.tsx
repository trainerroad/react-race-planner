import styled from "styled-components";

interface IErrorOverlayProps {
  error: string;
  clearError: () => void;
}
export const ErrorOverlay: React.FC<IErrorOverlayProps> = ({
  error,
  clearError,
}) => (
  <>
    <Backdrop />
    <Dialogue>
      <Alert>
        {error}
        <CloseButton onClick={clearError} />
      </Alert>
    </Dialogue>
  </>
);

const Backdrop = styled.div.attrs({ className: "modal-backdrop show" })`
  z-index: 1051;
`;

const Dialogue = styled.div.attrs({ role: "dialog" })`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  z-index: 1052;
`;

const Alert = styled.div.attrs({
  className: "alert alert-danger alert-dismissible",
  role: "alert",
})`
  margin: 0;
  z-index: 1053;
`;

const CloseButton = styled.button.attrs({
  type: "button",
  className: "close",
  "aria-label": "Clear error",
  children: "x",
})``;
