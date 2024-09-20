![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/rui-tx/catapi/playwright.yml?label=Tests)
![Website Deploy](https://deploy-badge.vercel.app/?url=https://catapi-eight.vercel.app/&name=catapi-eight.vercel.app)
![Website Up](https://img.shields.io/website?url=https%3A%2F%2Fcatapi-eight.vercel.app%2F)

# Cat API Browser

## About this project
This is a simple project, with the goal of interacting with the [The Cat API](https://thecatapi.com/) and, of course, learn React in all its glory.

## Demo
To see the project in action, check the link in the project description.

## Features
- Infinite gallery of random cat pictures
- Search: Search for images with specific criteria
- Favourites: Simple login system allow for saving your favourite cat pictures
- Votes: Upvote the pictures you most like, or dislike if you don't
- Browse cat breeds, and check for fun facts (WIP)
- Simple and flexible theme, including basic components like Button and Input
- Using [styled-components](https://styled-components.com/)

### CI/CD
- Using [Playwright](https://playwright.dev/) with Github Actions for automated tests
- Using [Vercel](https://vercel.com/) to build and deploy automatically

## Todos
- [ ] Add missing styled-components
- [ ] Fix Facts endpoint
- [ ] Implement Image upload
- [ ] Improve Search
- [ ] Improve Votes

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More
> This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
