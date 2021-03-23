import {
  fireEvent,
  screen,
  waitForElementToBeRemoved,
  waitFor,
  within,
} from "@testing-library/react";
import { mockAdapter, mockDeleteStageRace, setupApp } from "./utils";

const stageRaces = [
  {
    id: 1,
    name: "Stage Race 1",
    stages: [
      {
        id: "klsa2dr6",
        name: "Stage 1",
        date: "2020-01-01",
      },
    ],
  },
  {
    id: 2,
    name: "Stage Race 2",
    stages: [
      {
        id: "klsa3ny2",
        name: "Stage 1",
        date: "2021-01-01",
      },
    ],
  },
];

beforeEach(() => {
  mockAdapter.reset();
});

test("calls DELETE '/stage-races/{id}' on 'Delete' button click and handles success", async () => {
  await setupApp({ stageRaces });
  // initial list items (stage races 1 & 2)
  expect(screen.getByTestId("stage-race-1")).toBeInTheDocument();
  expect(screen.getByTestId("stage-race-2")).toBeInTheDocument();
  // delete stage race 1
  mockDeleteStageRace("1");
  fireEvent.click(
    within(screen.getByTestId("stage-race-1")).getByText("Delete")
  );
  // subsequent list items (stage race 1 only)
  await waitForElementToBeRemoved(() => screen.getByTestId("stage-race-1"));
  expect(screen.getByTestId("stage-race-2")).toBeInTheDocument();
  // DELETE '/stage-races/1' was called once
  expect(mockAdapter.history.delete.length).toBe(1);
  expect(mockAdapter.history.delete[0].url).toBe("/stage-races/1");
});

test("calls DELETE '/stage-races/{id}' on 'Delete' button click and handles error", async () => {
  await setupApp({ stageRaces });
  // initial list items (stage races 1 & 2)
  expect(screen.getByTestId("stage-race-1")).toBeInTheDocument();
  expect(screen.getByTestId("stage-race-2")).toBeInTheDocument();
  // attempt to delete stage race 2
  mockDeleteStageRace("2", 500);
  fireEvent.click(
    within(screen.getByTestId("stage-race-2")).getByText("Delete")
  );
  // error renders
  await waitFor(() => screen.getByText("Error deleting stage race"));
  // error can be cleared
  fireEvent.click(screen.getByLabelText("Clear error"));
  expect(
    screen.queryByText("Error deleting stage race")
  ).not.toBeInTheDocument();
  // subsequent list items (still stage races 1 & 2)
  expect(screen.getByTestId("stage-race-1")).toBeInTheDocument();
  expect(screen.getByTestId("stage-race-2")).toBeInTheDocument();
  // DELETE '/stage-races/2' was called once
  expect(mockAdapter.history.delete.length).toBe(1);
  expect(mockAdapter.history.delete[0].url).toBe("/stage-races/2");
});
