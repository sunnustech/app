# SunNUS 22 App Repo :sun_with_face:

![](/docs/images/sunnusofficial.jpg)

## Developed with :heart: in:

<p align="center">
   <span>
      <img src="https://github.com/devicons/devicon/blob/master/icons/react/react-original-wordmark.svg" width="45px" alt="react" />
      <img src="https://github.com/devicons/devicon/blob/master/icons/typescript/typescript-plain.svg" width="45px" alt="typescript" />
      <img src="https://github.com/devicons/devicon/blob/master/icons/firebase/firebase-plain-wordmark.svg" width="45px" alt="firebase" />
   </span>
</p>

## What is this repo for?

This repo is used to contain all the components used in building the mobile app for SunNUS 22. We use [expo](https://expo.dev/) to develop for both iOS and Android.

If you would like to learn more about the project in general or need a starting point, you may refer to the docs repo.

If you would like to learn more about how the backend and cloud functions are built, you may refer to the cloud repo.

## Repo structure

This repo has two main directories: `functions` and `tests`.

`functions` contain the logic for the `onRequest` and `onCall` backend functions.

`tests` contain ...

## Setup

- [node](https://nodejs.org/en/download/current/) **v16 and above**
- [yarn](https://classic.yarnpkg.com/en/docs/install#windows-stable) **strictly v1**
- [git](https://git-scm.com/downloads)
- [expo](https://docs.expo.dev/get-started/installation/)
- `firebase.js` (get it from a project member)

More detailed explanations on installation process can be found in docs repo.

Clone the repo. A folder called `app` should appear. After cloning the repo, install
node packages by running `yarn` in these directories:

- `app`

In order for the application to interact with firebase, you would need the firebase crendetials found in `firebase.js`.

As it contains sensitive information, it is not part of the repo. You may have to obtain it from the tech lead and put it into the root directory.

Ensure you are logged into expo using the CLI:

Then run `expo start` to start up a server.
