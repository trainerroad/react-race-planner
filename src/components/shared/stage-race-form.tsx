import styled from "styled-components";
import { DeleteIconButton } from "./buttons";

export const StageRaceFormStageListGroup = styled.ul.attrs({
  className: "list-group mb-3",
})``;

interface IStageRaceFormStageListGroupItemProps {
  id: string;
  date: string;
  name: string;
  onDelete: () => void;
}

export const StageRaceFormStageListGroupItem: React.FC<IStageRaceFormStageListGroupItemProps> = ({
  id,
  date,
  name,
  onDelete,
}) => (
  <li className="list-group-item" data-testid={`stage-${id}`}>
    <div className="row">
      <div className="col-sm-9">
        <div className="mb-2 m-sm-0">
          <span className="small">
            <strong className="d-block font-weight-bold">{date}</strong>
            <span className="d-block" data-testid="stage-name">
              {name}
            </span>
          </span>
        </div>
      </div>
      <div className="col-sm-3">
        <div className="h-100 d-flex align-items-center">
          <DeleteIconButton aria-label="Delete stage" onClick={onDelete} />
        </div>
      </div>
    </div>
  </li>
);

interface IStageRaceFormTotals {
  duration: string;
}

export const StageRaceFormTotals: React.FC<IStageRaceFormTotals> = ({
  duration,
}) => (
  <div className="row mb-3" data-testid="stage-race-form-totals">
    <div className="col-sm-12">
      <span>
        <span className="font-weight-bold">Duration:</span>{" "}
        <span>{duration}</span>
      </span>
    </div>
  </div>
);
