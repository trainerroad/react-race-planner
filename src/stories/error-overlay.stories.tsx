/* eslint-disable import/no-anonymous-default-export */
import { action } from "@storybook/addon-actions";
import { ErrorOverlay } from "../components/shared";

export default {
  title: "error overlay",
};

export const ErrorOverlayStory = () => (
  <ErrorOverlay error="Error message" clearError={action("clearError")} />
);
ErrorOverlayStory.storyName = "error overlay";
ErrorOverlayStory.parameters = {
  controls: { hideNoControlsWarning: true },
};
