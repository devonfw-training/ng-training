= https://angular.io[Angular] Training powered by http://devonfw.github.io/[devonfw]

This repository contains https://angular.io[Angular] training materials:

. *Slides* available https://devonfw.github.io/ng-training/[here].
. *Code* organized as step-by-step development of a simple application. Each step is a repository branch whose name starts with a step number, e.g. `1-hello-world`, `2-simple-component`, etc.

== Getting started

=== Install prerequisites

You need a Git client, the https://nodejs.org/[Node.js] and the https://github.com/angular/angular-cli[Angular CLI] to make use of the project seed.
It is highly recommended to use the following versions:

* Node.js 8.9.4
* Angular CLI 1.7.1

==== Git
Check if you have a Git client already installed:

----
git --version
----

If your OS can not recognize this command, install Git. For details please refer to http://git-scm.com[this page].
When installing under Windows, please make sure you check the following option:

- [*] Use git from Windows command prompt

==== Node.js

It is highly recommended to install the https://github.com/creationix/nvm[Node Version Manager] which manages multiple active
Node.js versions on your machine. The windows version of nvm can be found https://github.com/coreybutler/nvm-windows#installation--upgrades[here].
Once https://github.com/creationix/nvm[nvm] installed, install the Node.js:

----
nvm install 8.9.4
nvm use 8.9.4
----

==== Angular CLI

Having https://www.npmjs.com/[npm] installed you can install https://github.com/angular/angular-cli[Angular CLI] like this:

----
npm install -g @angular/cli@1.7.1
----

=== Start from _Hello World!_

Clone this repository:

----
git clone -b 1-hello-world https://github.com/devonfw/ng-training.git
----

let https://www.npmjs.com/[npm] to install all dependencies:

----
cd ng-training
npm install
----

and start the application:

----
ng serve --open
----

A _Hello World!_ web page should open in your default browser.