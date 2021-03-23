import styled from "styled-components";
import { FaTrash } from "react-icons/fa";

export const ButtonWrapper = styled.div`
  .btn {
    margin-right: 8px;
  }

  [class~="btn"]:last-of-type {
    margin-right: 0;
  }
`;

export const PrimaryButton = styled.button.attrs({
  className: "btn btn-primary",
})``;

export const SecondaryButton = styled.button.attrs({
  className: "btn btn-secondary",
})``;

export const SuccessButton = styled.button.attrs({
  className: "btn btn-success",
})``;

export const DangerButton = styled.button.attrs({
  className: "btn btn-danger",
})``;

export const PrimaryOutlineButton = styled.button.attrs({
  className: "btn btn-outline-primary",
})``;

export const SecondaryOutlineButton = styled.button.attrs({
  className: "btn btn-outline-secondary",
})``;

export const SuccessOutlineButton = styled.button.attrs({
  className: "btn btn-outline-success",
})``;

export const DangerOutlineButton = styled.button.attrs({
  className: "btn btn-outline-danger",
})``;

interface IIconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const IconButton = styled.button<{
  variant: "secondary" | "danger";
}>`
  background-color: inherit;
  border: none;
  color: ${({ variant }) => {
    switch (variant) {
      case "secondary":
        return "#899097";
      case "danger":
        return "#e35d6a";
    }
  }};
  cursor: pointer;
  display: inline-flex;
  font-size: inherit;
  font-weight: inherit;
  padding: 0;

  &:hover,
  &:focus {
    color: ${({ variant }) => {
      switch (variant) {
        case "secondary":
          return "#6c757d";
        case "danger":
          return "#dc3545";
      }
    }};
  }
`;

export const DeleteIconButton: React.FC<IIconButtonProps> = (props) => (
  <IconButton variant="danger" type="button" {...props}>
    <FaTrash aria-hidden="true" />
  </IconButton>
);
