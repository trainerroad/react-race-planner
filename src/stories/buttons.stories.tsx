/* eslint-disable import/no-anonymous-default-export */
import { action } from "@storybook/addon-actions";
import {
  ButtonWrapper,
  PrimaryButton,
  SecondaryButton,
  SuccessButton,
  DangerButton,
  PrimaryOutlineButton,
  SecondaryOutlineButton,
  SuccessOutlineButton,
  DangerOutlineButton,
} from "../components/shared";

export default {
  title: "buttons",
};

export const SolidStory = () => (
  <ButtonWrapper>
    <PrimaryButton onClick={action("primary")}>Primary</PrimaryButton>
    <SecondaryButton onClick={action("secondary")}>Secondary</SecondaryButton>
    <SuccessButton onClick={action("success")}>Success</SuccessButton>
    <DangerButton onClick={action("danger")}>Danger</DangerButton>
  </ButtonWrapper>
);
SolidStory.storyName = "solid";
SolidStory.parameters = {
  controls: { hideNoControlsWarning: true },
};

export const OutlineStory = () => (
  <ButtonWrapper>
    <PrimaryOutlineButton onClick={action("primary")}>
      Primary
    </PrimaryOutlineButton>
    <SecondaryOutlineButton onClick={action("secondary")}>
      Secondary
    </SecondaryOutlineButton>
    <SuccessOutlineButton onClick={action("success")}>
      Success
    </SuccessOutlineButton>
    <DangerOutlineButton onClick={action("danger")}>Danger</DangerOutlineButton>
  </ButtonWrapper>
);
OutlineStory.storyName = "outline";
OutlineStory.parameters = {
  controls: { hideNoControlsWarning: true },
};
