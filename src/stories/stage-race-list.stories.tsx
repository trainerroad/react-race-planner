/* eslint-disable import/no-anonymous-default-export */
import { action } from "@storybook/addon-actions";
import {
  StageRaceListGroup,
  StageRaceListGroupItem,
} from "../components/shared";

export default {
  title: "stage race list",
};

export const StageRaceListStory = () => (
  <StageRaceListGroup>
    <StageRaceListGroupItem
      id={1}
      name="Stage Race"
      date="2021-03-01"
      duration="1 day"
      onDelete={action("onDelete")}
    />
  </StageRaceListGroup>
);
StageRaceListStory.storyName = "stage race list";
StageRaceListStory.parameters = {
  controls: { hideNoControlsWarning: true },
};
