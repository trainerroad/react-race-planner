import {
  fireEvent,
  screen,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from "@testing-library/react";
import uniqid from "uniqid";
import {
  mockAdapter,
  mockPostStageRace,
  setupApp,
  setupFormModal,
  assertTextOrderByTestId,
} from "./utils";

const mockedUniqid = (uniqid as any) as jest.Mock;

beforeEach(() => {
  mockAdapter.reset();
});

test("clicking 'Add Stage Race' button opens the modal", async () => {
  await setupApp();
  // modal is closed by default
  expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
  // open modal
  fireEvent.click(screen.getByText("Add Stage Race"));
  await waitFor(() => screen.getByTestId("modal"));
});

test("modal 'Add Stage Race' form", async () => {
  const {
    withinModal,
    getStageRaceNameInput,
    getAddStageButton,
    getSaveButton,
    getCancelButton,
  } = await setupFormModal();
  // add stage race form renders by default
  expect(withinModal.getByText("Add Stage Race")).toBeInTheDocument();
  expect(getStageRaceNameInput()).toBeInTheDocument();
  expect(withinModal.getByText("No stages")).toBeInTheDocument();
  expect(withinModal.getByText("0 days")).toBeInTheDocument();
  expect(getAddStageButton()).toBeInTheDocument();
  expect(getSaveButton()).toBeInTheDocument();
  expect(getCancelButton()).toBeInTheDocument();
  // 'Add Stage' button is disabled without a stage race name
  expect(getAddStageButton()).toHaveAttribute("disabled");
  fireEvent.change(getStageRaceNameInput(), {
    target: { value: "New Race" },
  });
  expect(getAddStageButton()).not.toHaveAttribute("disabled");
  // 'Save' button is disabled without at least one stage
  expect(getSaveButton()).toHaveAttribute("disabled");
  // clicking 'Cancel' closes modal
  fireEvent.click(getCancelButton());
  await waitForElementToBeRemoved(() => screen.getByTestId("modal"));
});

test("modal 'Add Stage' form", async () => {
  const {
    withinModal,
    getStageRaceNameInput,
    getAddStageButton,
    getStageNameInput,
    getStageDateInput,
    getSaveButton,
    getCancelButton,
  } = await setupFormModal();
  // enter stage race name and click 'Add Stage' button
  fireEvent.change(getStageRaceNameInput(), {
    target: { value: "My Stage Race" },
  });
  fireEvent.click(getAddStageButton());
  // add stage race form renders
  expect(withinModal.getByText("Add Stage")).toBeInTheDocument();
  expect(getStageNameInput()).toBeInTheDocument();
  expect(getStageDateInput()).toBeInTheDocument();
  expect(getSaveButton()).toBeInTheDocument();
  expect(getCancelButton()).toBeInTheDocument();
  // 'Save' button is disabled without name and date
  expect(getSaveButton()).toHaveAttribute("disabled");
  fireEvent.change(getStageNameInput(), {
    target: { value: "Stage 1" },
  });
  fireEvent.change(getStageDateInput(), {
    target: { value: "2021-01-02" },
  });
  expect(getSaveButton()).not.toHaveAttribute("disabled");
  // clicking 'Cancel' returns to add stage race form without the stage
  fireEvent.click(getCancelButton());
  expect(screen.getByText("No stages")).toBeInTheDocument();
  expect(withinModal.getByText("Add Stage Race")).toBeInTheDocument();
});

test("calls POST '/stage-races' with stage race data and handles success [screenshot 3]", async () => {
  const {
    getStageRaceNameInput,
    getAddStageButton,
    getStageNameInput,
    getStageDateInput,
    getSaveButton,
  } = await setupFormModal();
  // enter stage race name
  fireEvent.change(getStageRaceNameInput(), {
    target: { value: "My Stage Race" },
  });
  // add stage 2 via stage form
  fireEvent.click(getAddStageButton());
  fireEvent.change(getStageNameInput(), {
    target: { value: "Stage 2" },
  });
  fireEvent.change(getStageDateInput(), {
    target: { value: "2021-02-02" },
  });
  mockedUniqid.mockImplementationOnce(() => "klsbm0ow");
  fireEvent.click(getSaveButton());
  // stage 2 renders on stage race form
  const withinStage1 = within(screen.getByTestId("stage-klsbm0ow"));
  expect(withinStage1.getByText("Stage 2")).toBeInTheDocument();
  expect(withinStage1.getByText("2021-02-02")).toBeInTheDocument();
  // stage 2 is reflected in stage race form totals
  expect(
    within(screen.getByTestId("stage-race-form-totals")).getByText("1 day")
  ).toBeInTheDocument();
  // add stage 1 via stage form
  fireEvent.click(getAddStageButton());
  fireEvent.change(getStageNameInput(), {
    target: { value: "Stage 1" },
  });
  fireEvent.change(getStageDateInput(), {
    target: { value: "2021-02-01" },
  });
  mockedUniqid.mockImplementationOnce(() => "klsbmlso");
  fireEvent.click(getSaveButton());
  // stage 1 renders on stage race form
  const withinStage2 = within(screen.getByTestId("stage-klsbmlso"));
  expect(withinStage2.getByText("Stage 1")).toBeInTheDocument();
  expect(withinStage2.getByText("2021-02-01")).toBeInTheDocument();
  // stage 1 and 2 are reflected in stage race form totals
  expect(
    within(screen.getByTestId("stage-race-form-totals")).getByText("2 days")
  ).toBeInTheDocument();
  // stages render sorted oldest to newest
  assertTextOrderByTestId("stage-name", ["Stage 1", "Stage 2"]);
  // add stage 3 via stage form
  fireEvent.click(getAddStageButton());
  fireEvent.change(getStageNameInput(), {
    target: { value: "Stage 3" },
  });
  fireEvent.change(getStageDateInput(), {
    target: { value: "2021-02-03" },
  });
  mockedUniqid.mockImplementationOnce(() => "km24cw4e");
  fireEvent.click(getSaveButton());
  // stage 1, 2 and 3 are reflected in stage race form totals
  expect(
    within(screen.getByTestId("stage-race-form-totals")).getByText("3 days")
  ).toBeInTheDocument();
  // stages render sorted oldest to newest
  assertTextOrderByTestId("stage-name", ["Stage 1", "Stage 2", "Stage 3"]);
  // delete stage 3
  const withinStage3 = within(screen.getByTestId("stage-km24cw4e"));
  fireEvent.click(withinStage3.getByLabelText("Delete stage"));
  expect(screen.queryByText("Stage 3")).not.toBeInTheDocument();
  expect(
    within(screen.getByTestId("stage-race-form-totals")).getByText("2 days")
  ).toBeInTheDocument();
  // save stage race
  mockPostStageRace({
    stageRace: {
      id: 1,
      name: "My Stage Race",
      stages: [
        {
          id: "klsbmlso",
          name: "Stage 1",
          date: "2021-02-01",
        },
        {
          id: "klsbm0ow",
          name: "Stage 2",
          date: "2021-02-02",
        },
      ],
    },
  });
  fireEvent.click(getSaveButton());
  // modal closes
  await waitForElementToBeRemoved(() => screen.getByTestId("modal"));
  // stage race is rendered in list
  const withinListItem = within(screen.getByTestId("stage-race-1"));
  expect(withinListItem.getByText("My Stage Race")).toBeInTheDocument();
  expect(withinListItem.getByText("2021-02-01")).toBeInTheDocument();
  expect(withinListItem.getByText("(2 days)")).toBeInTheDocument();
  // POST '/stage-races/' was called once
  expect(mockAdapter.history.post.length).toBe(1);
  expect(mockAdapter.history.post[0].url).toBe("/stage-races");
  expect(JSON.parse(mockAdapter.history.post[0].data)).toEqual({
    name: "My Stage Race",
    stages: [
      { id: "klsbmlso", name: "Stage 1", date: "2021-02-01" },
      { id: "klsbm0ow", name: "Stage 2", date: "2021-02-02" },
    ],
  });
});

test("calls POST '/stage-races' with stage race data and handles error", async () => {
  const {
    getStageRaceNameInput,
    getAddStageButton,
    getStageNameInput,
    getStageDateInput,
    getSaveButton,
  } = await setupFormModal();
  // enter stage race name
  fireEvent.change(getStageRaceNameInput(), {
    target: { value: "My Stage Race" },
  });
  // add a stage via stage form
  fireEvent.click(getAddStageButton());
  fireEvent.change(getStageNameInput(), {
    target: { value: "Stage 1" },
  });
  fireEvent.change(getStageDateInput(), {
    target: { value: "2021-02-05" },
  });
  mockedUniqid.mockImplementationOnce(() => "klscutfk");
  fireEvent.click(getSaveButton());
  // save stage race
  mockPostStageRace({
    responseCode: 500,
  });
  fireEvent.click(getSaveButton());
  // error renders
  await waitFor(() => screen.getByText("Error adding stage race"));
  // error can be cleared
  fireEvent.click(screen.getByLabelText("Clear error"));
  expect(screen.queryByText("Error adding stage race")).not.toBeInTheDocument();
  // modal stays open
  expect(screen.getByTestId("modal")).toBeInTheDocument();
  // POST '/stage-races/' was called once
  expect(mockAdapter.history.post.length).toBe(1);
  expect(mockAdapter.history.post[0].url).toBe("/stage-races");
  expect(JSON.parse(mockAdapter.history.post[0].data)).toEqual({
    name: "My Stage Race",
    stages: [{ id: "klscutfk", name: "Stage 1", date: "2021-02-05" }],
  });
});
