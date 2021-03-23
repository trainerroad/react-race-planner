# Stage Races List

## Requirements

- Renders a loading spinner while `GET "/stage-races"` request is in flight.

  ![Loading spinner](./screenshots/stage-races-list/1.png)

- Renders "No stage races" when `GET "/stage-races"` succeeds without records.

  ![No stage races](./screenshots/stage-races-list/2.png)

- Renders stage races sorted oldest to newest when `GET "/stage-races"` succeeds with records.

  ![Sorted stage races](./screenshots/stage-races-list/3.png)

- Renders "Error loading stage races" when `GET "/stage-races"` errors.

  - Error can be cleared.

  ![GET "/stage-race" error](./screenshots/stage-races-list/4.png)
