import styled from "styled-components";
import { ButtonWrapper, DangerOutlineButton } from "./buttons";

export const StageRaceListGroup = styled.div.attrs({
  className: "list-group mb-3",
})``;

interface IStageRaceListGroupItemProps {
  id: number;
  name: string;
  date: string; // earliest stage date
  duration: string;
  onDelete: () => void;
}

export const StageRaceListGroupItem: React.FC<IStageRaceListGroupItemProps> = ({
  id,
  name,
  date,
  duration,
  onDelete,
}) => (
  <div className="list-group-item" data-testid={`stage-race-${id}`}>
    <h2 data-testid="stage-race-name">{name}</h2>
    <p>
      {date} <span className="text-muted">({duration})</span>
    </p>
    <ButtonWrapper>
      <DangerOutlineButton onClick={onDelete}>Delete</DangerOutlineButton>
    </ButtonWrapper>
  </div>
);
