/* eslint-disable import/no-anonymous-default-export */
import { FormInputGroup } from "../components/shared";

export default {
  title: "forms",
};

export const TextInputGroupWithPlaceholderStory = () => (
  <FormInputGroup
    id="text-input-placeholder"
    type="text"
    placeholder="placeholder"
  />
);
TextInputGroupWithPlaceholderStory.storyName =
  "text input group with placeholder";
TextInputGroupWithPlaceholderStory.parameters = {
  controls: { hideNoControlsWarning: true },
};

export const TextInputGroupWithLabelStory = () => (
  <FormInputGroup id="text-input-with-label" type="text" label="Label" />
);
TextInputGroupWithLabelStory.storyName = "text input group with label";
TextInputGroupWithLabelStory.parameters = {
  controls: { hideNoControlsWarning: true },
};

export const DateInputGroupWithLabelStory = () => (
  <FormInputGroup id="date-input-with-label" type="date" label="Label" />
);
DateInputGroupWithLabelStory.storyName = "date input group with label";
DateInputGroupWithLabelStory.parameters = {
  controls: { hideNoControlsWarning: true },
};
