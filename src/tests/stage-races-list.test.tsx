import { fireEvent, screen, waitFor, within } from "@testing-library/react";
import {
  mockAdapter,
  mockGetStageRaces,
  renderRoot,
  setupApp,
  assertTextOrderByTestId,
} from "./utils";

beforeEach(() => {
  mockAdapter.reset();
});

test("renders loading spinner while GET '/stage-races' is in flight", async () => {
  // setup app
  mockGetStageRaces();
  renderRoot();
  // loading spinner renders
  await waitFor(() => screen.getByLabelText("Loading..."));
  // GET '/stage-races' was called once
  expect(mockAdapter.history.get.length).toBe(1);
  expect(mockAdapter.history.get[0].url).toBe("/stage-races");
});

test("renders 'No stage races' when GET '/stage-races' succeeds without records", async () => {
  await setupApp();
  // text renders
  expect(screen.getByText("No stage races")).toBeInTheDocument();
});

test("renders stage races sorted oldest to newest when GET '/stage-races succeeds with records", async () => {
  const stageRaces = [
    {
      id: 1,
      name: "Newer Stage Race",
      stages: [
        {
          id: "klsa1tcy",
          name: "Stage 1",
          date: "2021-01-01",
        },
      ],
    },
    {
      id: 2,
      name: "Older Stage Race",
      stages: [
        {
          id: "klsa20hj",
          name: "Stage 1",
          date: "2020-01-01",
        },
        {
          id: "klsa27eo",
          name: "Stage 2",
          date: "2020-01-02",
        },
      ],
    },
  ];
  await setupApp({ stageRaces });
  // list item order
  assertTextOrderByTestId("stage-race-name", [
    "Older Stage Race",
    "Newer Stage Race",
  ]);
  // list item content
  const withinOlderItem = within(screen.getByTestId("stage-race-2"));
  expect(withinOlderItem.getByText("Older Stage Race")).toBeInTheDocument();
  expect(withinOlderItem.getByText("2020-01-01")).toBeInTheDocument();
  expect(withinOlderItem.getByText("(2 days)")).toBeInTheDocument();
  const withinNewerItem = within(screen.getByTestId("stage-race-1"));
  expect(withinNewerItem.getByText("Newer Stage Race")).toBeInTheDocument();
  expect(withinNewerItem.getByText("2021-01-01")).toBeInTheDocument();
  expect(withinNewerItem.getByText("(1 day)")).toBeInTheDocument();
});

test("renders 'Error loading stage races' when GET '/stage-races' errors", async () => {
  await setupApp({ responseCode: 500 });
  // error renders
  await waitFor(() => screen.getByText("Error loading stage races"));
  // error can be cleared
  fireEvent.click(screen.getByLabelText("Clear error"));
  expect(
    screen.queryByText("Error loading stage races")
  ).not.toBeInTheDocument();
});
