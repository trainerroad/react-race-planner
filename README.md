# react-race-planner

## Requirements

Create the views for a [stage race](https://en.wikipedia.org/wiki/Race_stage) planner. For each view, there are issues and tests.

| View              | Links                                                                                |
| ----------------- | ------------------------------------------------------------------------------------ |
| Stage Races List  | [Issue](issues/stage-races-list.md) • [Tests](src/tests/stage-races-list.test.tsx)   |
| Delete Stage Race | [Issue](issues/delete-stage-race.md) • [Tests](src/tests/delete-stage-race.test.tsx) |
| Add Stage Race    | [Issue](issues/add-stage-race.md) • [Tests](src/tests/add-stage-race.test.tsx)       |

## Guidelines

- Satisfy the requirements using TypeScript and React.

- Make use of, but don't change, the dependencies in [`package.json`](package.json).

- Make use of, but don't change, the components in [`src/components/shared`](src/components/shared/index.ts). See examples in [`src/stories`](src/stories).

- Don't change the tests in [`src/tests`](src/tests).

## Submission

When the tests pass, and the UI resembles the screenshots, archive your work in a `.zip` file and send it to https://trainerroad.recruiterbox.com/jobs/fk0us5r/. _Do not include `node_modules` in the `.zip` file._

## Feedback

Something we can improve? Email support@trainerroad.com.

## Scripts

### Setup

```sh
npm install
```

Requires [Node](https://nodejs.org) and [NPM](https://www.npmjs.com/).

### Develop

```sh
npm start
```

[JSON Server](https://github.com/typicode/json-server) will start on port 4000 and [Create React App](https://github.com/facebook/create-react-app) will start on port 3000.

### Storybook

```sh
npm run storybook
```

[Storybook](https://storybook.js.org) will start on port 8000.

### Test

```sh
npm test
```

Tests are written with [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).

## Boilerplate

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and [TypeScript](https://create-react-app.dev/docs/adding-typescript).
