/* eslint-disable import/no-anonymous-default-export */
import { LoadingSpinner } from "../components/shared";

export default {
  title: "loading spinner",
};

export const LoadingSpinnerStory = () => <LoadingSpinner />;
LoadingSpinnerStory.storyName = "loading spinner";
LoadingSpinnerStory.parameters = {
  controls: { hideNoControlsWarning: true },
};
