# launchasaur-functions

## Description

Firebase Cloud Functions for Launchasaur.

## Development

`NOTE:` [nvm](https://github.com/nvm-sh/nvm) is required to easily switch between node,js versions. Firebase cloud functions only supports node.js v8 and v10. We use v10.

1. Install dependencies

```
nvm install 10.23.0
nvm use 10.23.0
yarn install
```

2. Run the app

```
yarn dev
```

## Deployment

```
yarn firebase login
nvm use 10.23.0
yarn deploy
```

## Publishing

`NOTE`: With each release, the version in [package.json](./package.json) should be updated if the package has changed. This command should be run before each release.`
