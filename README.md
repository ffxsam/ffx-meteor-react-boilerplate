# Meteor 1.3 + React Boilerplate
(and sample project)

## Purpose

The goal of this boilerplate is twofold:

1. To provide a good starting point as a scaffold for new Meteor/React projects.
This boilerplate will continue to evolve as Meteor and React continue to change
and mature.
2. To also serve as a learning resource by offering an example project.

## Installation

Clone this repository, then run:

    $ npm install

This will install NPM packages and update the Meteor packages used in the
boilerplate.

If you'd like to examine and mess around with the example project (complete with
comments), run:

    $ npm run example

Your starting point for the code walkthrough should start at /client/routes.jsx.
The code is heavily commented and will guide you through the entire app. Use
`npm run exit` to get out of the example (same as `git checkout -f master`).

Once you're ready to get started with your own project, make sure you're in the
master branch and run:

    $ npm run scaffold

which will remove the `.git` folder and this `README.md`.

## Exploring the Example Project

Explanations can be found in the comments of the code, so check there. Your
starting point should be `/client/routes.jsx`. From that point, comments will
guide you through the rest of the application.

If you have any questions, please create an issue in GitHub. Thanks!
