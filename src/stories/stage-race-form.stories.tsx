/* eslint-disable import/no-anonymous-default-export */
import { action } from "@storybook/addon-actions";
import {
  StageRaceFormStageListGroup,
  StageRaceFormStageListGroupItem,
  StageRaceFormTotals,
} from "../components/shared";

export default {
  title: "stage race form",
};

export const StageRaceFormStory = () => (
  <div style={{ maxWidth: 500 }}>
    <h4>Stages</h4>
    <StageRaceFormStageListGroup>
      <StageRaceFormStageListGroupItem
        id="fg8dffc"
        date="2021-03-01"
        name="Stage 1"
        onDelete={action("onDelete")}
      />
    </StageRaceFormStageListGroup>
    <StageRaceFormTotals duration="1 day" />
  </div>
);
StageRaceFormStory.storyName = "stage race form";
StageRaceFormStory.parameters = {
  controls: { hideNoControlsWarning: true },
};
