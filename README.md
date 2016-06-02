# Meteor 1.3 + React Boilerplate

(and sample project)

## Purpose

The goal of this boilerplate is twofold:

1. To provide a good starting point as a scaffold for new Meteor/React projects. This boilerplate will continue to evolve as Meteor and React continue to change and mature.
2. To also serve as a learning resource by offering an example project.

## Installation

Clone this repository, then run:

    $ npm install

This will install NPM packages and update the Meteor packages used in the boilerplate.

Once you're ready to get started with your own project, make sure you're in the master branch and run:

    $ npm run scaffold

which will remove the `.git` folder and this `README.md`, give you a proper working `package.json` file, and finally set up a starting folder structure.

## Exploring the Example Project

The example project shows all the basics of React, Redux and Redux thunks working together with Meteor. It's a separate branch of the project, so just switch to the `example` branch to see it:

    $ git checkout example

This _must_ be done before running `npm run scaffold`, since that script will destroy the `.git` folder. Explanations can be found in the comments of the code, so check there. Your starting point should be `/client/routes.js`. From that point, comments will guide you through the rest of the application. Use `git checkout -f master` to get out of the example.

## Ideas That Graduated
### `features` folder

I've been using this structure for awhile now, where there's a folder called `features` which contains large parts of a project. For example:

* `features/Billing`
* `features/AnimatedCharts`

These are typically self-contained groups of components, containers, and methods that are not used anywhere else. I've found that this structure makes it much easier for me to track down problems because I know exactly where to look.

## Future Ideas/Plans

* Come up with a totally working and killer test solution using Mocha and Enzyme
* Explore CSS Modules.

If you have any questions, please create an issue in GitHub. Thanks!

## Beer

Oh, and if you found any of this helpful, feel free to buy me a beer! Bitcoin address follows.

<img src="http://i.imgur.com/H68h2je.jpg" width="139" height="138">

**Address: 1PFe5p4PFv8fhE9tdHyTkHamBivzySyYxD**
