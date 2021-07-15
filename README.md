# TreeDots Fullstack Take-Home Assignment

The challenge has two parts:

1) a [task](#task) to create a basic front-end site to show a few of our hubs located on the Singapore map

2) some [follow-up questions](./FOLLOW-UP.md)

----

You will be graded based on the following have been met:

* Your implementation works as described in the [task](#task).

* Your solution looks like the provided [design](#design).

----

## Task

The main features we are looking for are:

- Implement the single-page design.
  - The top part is a map widget while the bottom part is a list widget.
  - Exclude the "Search Hub" button for now.

- Fetch hub data from the provided `hubs.json` and format them into client readable results in the design.
  - You are not required to serve this separately from the dev server (i.e. `npm start`).

- Use the returned data to display on the map widget as map markers and in the list of "Hubs Near You".
  - Map markers should be labelled with "A", "B", "C" and so forth based on its order within the list.

- Allow user to select and unselect the map marker or hub.
  - When a map marker or hub is selected,
    - the selected hub is shown as a normal map marker without label.
    - the list should automatically exclude the selected hub.

- **(Bonus+1)** Use GPS web functionality to identify the user's location.
  - Upon retrieving the location, the map widget should automatically centralize based on the position of the detected location.

- **(Bonus+2)** Allow user to know the nearest hub (map markers) by ordering them by nearest to furthest in the list.

## Design

We've provided a [design](./design.png) for small-screens (480px). Don't worry about tackling larger breakpoints, but **please make sure your solution looks good at 480px in portrait orientation**.

## Client implementation

We'd like you to use [Vue.js](https://vuejs.org/) and optionally [Quasar](https://quasar.dev/). On top of that, use whatever front-end libraries you feel comfortable with.

No backend server or API is required, but you may use one by all means.

## Hubs data

The provided `hubs` `json` contains a list of different hubs together with their id, name and location details.

## Submission Guidelines

* Create a public repo containing your project/solution.

* Your repo should contain the [FOLLOW-UP.md](./FOLLOW-UP.md) file with answers to the follow-up questions.

----

Once we've had a chance to review your submission we'll get back to you with next steps.

Thank you! ❤️
