# 1. React Query

Date: 6 Sep 2022

## Status

Proposed

## Context

The React page will need to be able to call an api to then transfer funds and refresh the data (or update the state).

There are a few options for this:
* use a library like `react-query` to handle the api calls
* use a library like axios to handle the api calls
* use a library like redux to dispatch the relevant calls and update the app's state


## Decision

ReactQuery is preferred as it focuses on state that is fetched from an external source. 

The app will use RQ to transfer the funds and refresh the data (or update the state) on the page.


## Consequences

Dependency on ReactQuery.



