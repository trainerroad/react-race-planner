import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
  within,
} from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import { adapter } from "../api";
import { IStageRace } from "../types";
import Root from "../components/Root";

/*
 *  api
 */
export const mockAdapter = new MockAdapter(adapter);

interface IMockGetStageRacesConfig {
  responseCode?: number;
  stageRaces?: IStageRace[];
}
export const mockGetStageRaces = ({
  responseCode = 200,
  stageRaces = [],
}: IMockGetStageRacesConfig = {}) =>
  mockAdapter.onGet("/stage-races").replyOnce(responseCode, stageRaces);

export const mockPostStageRace = ({
  responseCode = 200,
  stageRace,
}: {
  responseCode?: number;
  stageRace?: IStageRace;
} = {}) =>
  mockAdapter.onPost("/stage-races").replyOnce(responseCode, stageRace);

export const mockDeleteStageRace = (id: string, responseCode = 200) =>
  mockAdapter.onDelete(`/stage-races/${id}`).replyOnce(responseCode);

/*
 *  render
 */
export const renderRoot = () => render(<Root />);

/*
 *  setup
 */
export const setupApp = async (
  mockGetStageRacesConfig?: IMockGetStageRacesConfig
) => {
  // mock initial GET '/stage races' call
  mockGetStageRaces(mockGetStageRacesConfig);
  // render root component
  renderRoot();
  // wait for loading spinner to disappear
  await waitForElementToBeRemoved(() => screen.getByLabelText("Loading..."));
};

export const setupFormModal = async () => {
  await setupApp();
  // open modal
  fireEvent.click(screen.getByText("Add Stage Race"));
  const withinModal = within(screen.getByTestId("modal"));
  // stage race form elements
  const getStageRaceNameInput = () =>
    withinModal.getByPlaceholderText("Enter stage race name");
  const getAddStageButton = () => withinModal.getByText("Add Stage");
  // stage form elements
  const getStageNameInput = () => withinModal.getByLabelText("Name");
  const getStageDateInput = () => withinModal.getByLabelText("Date");
  // common elements
  const getSaveButton = () => withinModal.getByText("Save");
  const getCancelButton = () => withinModal.getByText("Cancel");

  return {
    withinModal,
    getStageRaceNameInput,
    getStageNameInput,
    getStageDateInput,
    getAddStageButton,
    getSaveButton,
    getCancelButton,
  };
};

/*
 *  assert
 */
export const assertTextOrderByTestId = (
  testId: string,
  expectedTexts: string[]
) => {
  const texts = screen
    .getAllByTestId(testId)
    .map((element) => element.textContent);
  expect(texts).toEqual(expectedTexts);
};
